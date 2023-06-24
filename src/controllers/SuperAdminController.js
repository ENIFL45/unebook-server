const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../utils/errorHandler");
const SuperAdmin = require("../models/superAdmin");
const sendEmail = require("../services/EmailService");
const { SuperAdminEmailTemplate } = require("../utils/emailTemplates");
const keys = require("../utils/keys");
const logger = require("../utils/logger");

exports.getSuperAdmins = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    let superAdmins;
    if (page) {
      superAdmins = await SuperAdmin.findAll({
        where: {
          email: {
            [Sequelize.Op.not]: req.user.email,
          },
          isPrimeUser: {
            [Sequelize.Op.not]: true,
          },
        },
        attributes: { exclude: ["password"] },
        order: [["updatedAt", "DESC"]],
        limit: limit,
        offset: offset,
      });
    } else {
      superAdmins = await SuperAdmin.findAll({
        where: {
          email: {
            [Sequelize.Op.not]: req.user.email,
          },
          isPrimeUser: {
            [Sequelize.Op.not]: true,
          },
        },
        attributes: { exclude: ["password"] },
        order: [["updatedAt", "DESC"]],
      });
    }
    res.status(StatusCodes.OK).json({ superAdmins, message: "success!" });
    logger.info(`fetched superadmins list successfully!.`);
  } catch (err) {
    next(err);
  }
};

exports.createSuperAdmin = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const password = crypto.randomBytes(10).toString("hex");

    const SUPERADMIN_MODEL = {
      superAdminName: name,
      email: email,
      emailVerified: false,
      createdBy: req.user.email,
      password: password,
    };

    const addSuperAdmin = await SuperAdmin.create(SUPERADMIN_MODEL);

    const mailObject = {
      to: email,
      subject: "Super Admin Request",
      html: SuperAdminEmailTemplate(
        name,
        email,
        password,
        keys.clientUrl,
        keys.mailContactTo,
        keys.mailReportTo
      ),
    };

    const mail = await sendEmail(mailObject);

    res.status(StatusCodes.OK).json({
      mailInfoId: mail,
      message: "New super admin has been added sucessfully.",
    });
    logger.info(`A new super Admin created with an id ${addSuperAdmin.id}`);
  } catch (err) {
    next(err);
  }
};

exports.updateSuperAdmin = async (req, res, next) => {
  try {
    const { name, email, id, status } = req.body;

    const SUPERADMIN_MODEL = {
      superAdminName: name,
      email: email,
      status: status,
    };

    await SuperAdmin.update(SUPERADMIN_MODEL, {
      where: { id: id },
    });

    res.status(StatusCodes.OK).json({
      message: "Updated successfully!",
    });
    logger.info(`${id} Super admin updated successfully!`);
  } catch (err) {
    next(err);
  }
};

exports.deleteSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user.isPrimeUser) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        `you're not a Prime user to process this request!`
      );
    }

    const { id } = req.params;

    await SuperAdmin.destroy({
      where: { id: id },
    });

    res.status(StatusCodes.OK).json({
      message: "Deleted successfully!",
    });
    logger.info(`${id} Super admin deleted successfully!`);
  } catch (err) {
    next(err);
  }
};

exports.passwordChange = async (req, res, next) => {
  try {
    const { password, prevPassword } = req.body;
    const user = await SuperAdmin.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, "Invalid user Id!");
    }

    const passwordMatch = await bcrypt.compare(prevPassword, user.password);
    if (!passwordMatch) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        "Invalid Previous password!"
      );
    }

    const SUPERADMIN_MODEL = {
      password: password,
    };

    await SuperAdmin.update(SUPERADMIN_MODEL, {
      where: { id: req.user.id },
    });

    res.status(StatusCodes.OK).json({
      message: "Password changed successfully",
    });
    logger.info(`${id} Super admin password changed successfully!`);
  } catch (err) {
    next(err);
  }
};
