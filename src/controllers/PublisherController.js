const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../utils/errorHandler");
const Publishers = require("../models/publishers");
const PublisherAdmins = require("../models/publisherAdmins");
const sendEmail = require("../services/EmailService");
const keys = require("../utils/keys");
const { Publisher, PublisherStatus } = require("../utils/emailTemplates");
const logger = require("../utils/logger");
const uuid = require("uuid");
const {
  uploadObjectHandler,
  DeleteObjectHandler,
  generatePresignedUrl
} = require("../services/s3Service");

exports.getAllPublishers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    let publisherArray = [];
    let getPublishers;
    if (page) {
      getPublishers = await Publishers.findAll({
        limit: limit,
        offset: offset,
        order: [["updatedAt", "DESC"]]
      });
    } else {
      getPublishers = await Publishers.findAll({
        order: [["updatedAt", "DESC"]]
      });
    }

    await Promise.all(
      getPublishers?.map(async (value) => {
        const key = value.dataValues.logo;
        let uri = "";
        let fileName = "";
        if (key) {
          uri = await generatePresignedUrl(key);
          fileName = key.split("@").pop();
        }

        publisherArray.push({
          ...value.dataValues,
          logo: uri,
          fileName: fileName
        });
      })
    );
    getPublishers = publisherArray;
    res.status(StatusCodes.OK).json({ getPublishers, message: "success!" });
    logger.info(`fetched publishers list successfully!.`);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createPublisher = async (req, res, next) => {
  try {
    const {
      name,
      publisherUrl,
      publisherLogo,
      publisherSuffix,
      publisherAdminEmail,
      publisherAdminName,
      fileName
    } = req.body;

    let imageBuffer = null;
    let imageKey = null;
    let attachments = {};
    let logoExtension = "";

    if (publisherLogo) {
      logoExtension = fileName.split(".").pop();
      const logoName = fileName.split(".").shift();
      imageKey = `${uuid.v4()}@${logoName}.${logoExtension}`;
    }
    const PUBLISHER_MODEL = {
      publisherName: name,
      publisherSuffix: publisherSuffix,
      publisherUrl: publisherUrl,
      createdBy: req.user.email,
      logo: imageKey
    };

    const createPublisher = await Publishers.create(PUBLISHER_MODEL);

    if (publisherLogo) {
      const base64Data = publisherLogo.replace(/^data:image\/\w+;base64,/, "");
      imageBuffer = Buffer.from(base64Data, "base64");
      await uploadObjectHandler(imageBuffer, imageKey);
      imageURL = await generatePresignedUrl(imageKey);
      attachments = {
        attachments: [
          {
            filename: `logo_${fileName}`,
            href: imageURL
          }
        ]
      };
    }

    if (publisherAdminEmail && publisherAdminName) {
      const PUBLISHERADMIN_MODEL = {
        adminName: publisherAdminName,
        email: publisherAdminEmail,
        createdBy: req.user.email,
        emailVerfied: false,
        publisherId: createPublisher.id,
        publisherName: createPublisher.publisherName
      };
      await PublisherAdmins.create(PUBLISHERADMIN_MODEL);
    }

    const mailObject = {
      to: keys.publisherEmailTo,
      cc: keys.publisherEmailCc,
      subject: "New instance request from Unebook",
      html: Publisher(
        name,
        publisherSuffix,
        keys.mailContactTo,
        publisherAdminEmail,
        publisherAdminName
      ),
      ...(attachments && attachments)
    };

    const mail = await sendEmail(mailObject);
    res.status(StatusCodes.OK).json({
      createPublisher,
      mailInfoId: mail,
      message: "New publisher request has been sent to Amnet successfully."
    });
    logger.info(
      `A new publisher has been created with an id ${createPublisher.id}.`
    );
  } catch (err) {
    next(err);
  }
};

exports.updatePublisher = async (req, res, next) => {
  try {
    const {
      id,
      name,
      publisherLogo,
      publisherSuffix,
      publisherUrl,
      status,
      fileName
    } = req.body;

    const isPublisherExists = await Publishers.findOne({
      where: { id: id }
    });

    if (!isPublisherExists) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Publisher doesn't Exists!"
      );
    }
    let imageKey = isPublisherExists.logo;
    if (imageKey && !publisherLogo) {
      await DeleteObjectHandler(imageKey);
      imageKey = "";
    }

    if (
      isPublisherExists.status === "Setup In Progress" &&
      status === "Active" &&
      !req.user.isPrimeUser
    ) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Invalid Request!");
    } else if (
      isPublisherExists.status === "Setup In Progress" &&
      status === "Active" &&
      req.user.isPrimeUser
    ) {
      const mailObject = {
        to: keys.publisherEmailTo,
        cc: keys.publisherEmailCc,
        subject: "Publisher Status Change",
        html: PublisherStatus(
          keys.secondaryUserName,
          name,
          publisherSuffix,
          keys.mailReportTo
        )
      };
      const mail = await sendEmail(mailObject);

      logger.info(
        `Mail sent successfully to ${keys.secondaryUserName} for publisher status change ${mail}`
      );
    }
    if (publisherLogo && publisherLogo.search("http") == -1) {
      const logoExtension = fileName.split(".").pop();
      const logoName = fileName.split(".").shift();
      imageKey = `${uuid.v4()}@${logoName}.${logoExtension}`;
    }

    const PUBLISHER_MODEL = {
      status: status,
      publisherName: name,
      logo: imageKey,
      publisherSuffix: publisherSuffix,
      publisherUrl: publisherUrl
    };

    await Publishers.update(PUBLISHER_MODEL, {
      where: { id: id }
    });

    if (publisherLogo && publisherLogo.search("http") == -1) {
      const base64Data = publisherLogo.replace(/^data:image\/\w+;base64,/, "");
      imageBuffer = Buffer.from(base64Data, "base64");
      await uploadObjectHandler(imageBuffer, imageKey);
    }

    res.status(StatusCodes.OK).json({
      message: "Updated sucessfully!"
    });
    logger.info(`${id} Publisher updated sucessfully!`);
  } catch (err) {
    next(err);
  }
};

exports.deletePublisher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isEmailExists = await Publishers.findOne({
      where: { id: id }
    });

    if (!isEmailExists) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Publisher doesn't exists!"
      );
    }
    const key = isEmailExists.logo;
    key && (await DeleteObjectHandler(isEmailExists.logo));
    await Publishers.destroy({
      where: { id: id }
    });

    res.status(StatusCodes.OK).json({
      message: "Deleted sucessfully!"
    });
    logger.info(`${id} Publisher Deleted sucessfully!`);
  } catch (err) {
    next(err);
  }
};
