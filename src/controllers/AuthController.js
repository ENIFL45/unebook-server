const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const keys = require("../utils/keys");
const { ErrorHandler } = require("../utils/errorHandler");
const logger = require("../utils/logger");
const SuperAdmin = require("../models/superAdmin");
const { ForgotPasswordEmailTemplate } = require("../utils/emailTemplates");
const sendEmail = require("../services/EmailService");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await SuperAdmin.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        "Invalid email or password!"
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        "Invalid email or password!"
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isPrimeUser: user.isPrimeUser },
      keys.jwrSecretKey,
      { expiresIn: "24h" }
    );

    res.status(StatusCodes.OK).json({
      acess_token: token,
      ...user.dataValues,
      password: password,
      message: "Logged in successfully",
    });
    logger.info(`${user.email} Logged in successfully!`);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await SuperAdmin.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, "Invalid user!");
    }

    const password = crypto.randomBytes(10).toString("hex");

    await SuperAdmin.update(
      { password: password },
      {
        where: { email: email },
      }
    );

    const mailObject = {
      to: email,
      subject: "Forgot Password",
      html: ForgotPasswordEmailTemplate(
        user.superAdminName,
        password,
        keys.mailContactTo,
        keys.mailReportTo
      ),
    };

    const mail = await sendEmail(mailObject);

    res.status(StatusCodes.OK).json({
      mailInfoId: mail,
      message: "Email sent sucessfully",
    });
    logger.info(`password has sent to the mail ${email} successfully!`);
  } catch (err) {
    next(err);
  }
};
