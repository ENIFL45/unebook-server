const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../utils/errorHandler");
const PublisherAdmins = require("../models/publisherAdmins");
const { PublisherAdminEmailTemplate } = require("../utils/emailTemplates");
const Publishers = require("../models/publishers");
const keys = require("../utils/keys");
const sendEmail = require("../services/EmailService");
const logger = require("../utils/logger");

exports.getAllAdmins = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    let getPublisherAdmins;
    if (page) {
      getPublisherAdmins = await PublisherAdmins.findAll({
        order: [["updatedAt", "DESC"]],
        limit: limit,
        offset: offset,
      });
    } else {
      getPublisherAdmins = await PublisherAdmins.findAll({
        order: [["updatedAt", "DESC"]],
      });
    }

    res.status(StatusCodes.OK).json({
      getPublisherAdmins,
      message: "success!",
    });
    logger.info(`fetched publisheradmins list`);
  } catch (err) {
    next(err);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { email, name, publisherId } = req.body;

    const isPublisher = await Publishers.findOne({
      where: { id: publisherId },
    });

    if (!isPublisher) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Publisher ID doesn't exists!"
      );
    }

    const PUBLISHERADMIN_MODEL = {
      adminName: name,
      email: email,
      createdBy: req.user.email,
      emailVerfied: false,
      publisherId: publisherId,
      publisherName: isPublisher.publisherName,
    };

    const createPublisherAdmin = await PublisherAdmins.create(
      PUBLISHERADMIN_MODEL
    );

    const mailObject = {
      to: keys.publisherEmailTo,
      cc: keys.publisherEmailCc,
      subject: "Publisher Admin Request",
      html: PublisherAdminEmailTemplate(
        isPublisher.publisherName,
        isPublisher.publisherSuffix,
        name,
        email,
        keys.mailContactTo,
        keys.mailReportTo
      ),
    };

    const mail = await sendEmail(mailObject);
    res.status(StatusCodes.OK).json({
      mailInfoId: mail,
      message: "New publisher admin has been added sucessfully.",
    });
    logger.info(
      `A new publisher admin has been created with an id ${createPublisherAdmin.id}`
    );
  } catch (err) {
    next(err);
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    const { id, email, name, publisherId, status } = req.body;

    const isPublisher = await Publishers.findOne({
      where: { id: publisherId },
    });

    if (!isPublisher) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Publisher ID doesn't exists!"
      );
    }

    const isExists = await PublisherAdmins.findOne({
      where: { id: id },
    });

    if (!isExists) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Publisher admin ID doesn't exists!"
      );
    }

    const PUBLISHERADMIN_MODEL = {
      adminName: name,
      publisherName: isPublisher.publisherName,
      publisherId: publisherId,
      status: status,
      email: email,
    };

    await PublisherAdmins.update(PUBLISHERADMIN_MODEL, { where: { id: id } });

    res.status(StatusCodes.OK).json({
      message: "Updated sucessfully!",
    });
    logger.info(`${id} publisher admin Updated sucessfully!`);
  } catch (err) {
    next(err);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isExists = await PublisherAdmins.findOne({
      where: { id: id },
    });

    if (!isExists) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Publisher admin ID doesn't exists!"
      );
    }

    await PublisherAdmins.destroy({
      where: { id: id },
    });

    res.status(StatusCodes.OK).json({
      message: "Deleted sucessfully!",
    });
    logger.info(`${id} publisher admin Deleted sucessfully!`);
  } catch (err) {
    next(err);
  }
};
