const { StatusCodes } = require("http-status-codes");
const SuperAdmin = require("../models/superAdmin");
const { ErrorHandler } = require("../utils/errorHandler");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");

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

exports.currentUserDetailsChange = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await SuperAdmin.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, "Invalid token!");
    }

    const SUPERADMIN_MODEL = {
      superAdminName: name,
      email: email,
    };

    const update = await SuperAdmin.update(SUPERADMIN_MODEL, {
      where: { id: req.user.id },
      returning: true,
    });

    const updateuser = update[1][0];

    res.status(StatusCodes.OK).json({
      ...updateuser.dataValues,
      message: "Updated successfully!",
    });
    logger.info(`${id} Super admin details changed successfully!`);
  } catch (err) {
    next(err);
  }
};

exports.currentUserDetails = async (req, res, next) => {
  try {
    const user = await SuperAdmin.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, "Invalid token!");
    }

    res.status(StatusCodes.OK).json({
      ...user.dataValues,
      message: "success!",
    });
    logger.info(`${req.user.id} Super admin details fetched successfully!`);
  } catch (err) {
    next(err);
  }
};
