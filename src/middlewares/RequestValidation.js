const { body, param, query, validationResult } = require("express-validator");
const { ErrorHandler } = require("../utils/errorHandler");
const { StatusCodes } = require("http-status-codes");

const validateLoginRequest = [
  body("email", "email is required").notEmpty(),
  body("password", "password is required").notEmpty(),
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validateForgotPassWordRequest = [
  body("email", "email is required").notEmpty(),
  body("email", "Invalid email format").isEmail(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validateSuperAdminCreateRequest = [
  body("email", "email is required").notEmpty(),
  body("name", "name is required").notEmpty(),
  body("email", "Invalid email format").isEmail(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validatePublisherCreateRequest = [
  body("name", "publisherName is required").notEmpty(),
  body("publisherSuffix", "publisherSuffix is required").notEmpty(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validatePubisherCreateAdminRequest = [
  body("publisherAdminEmail", "Publisher Admin Email is required").notEmpty(),
  body("publisherAdminName", "Publisher Admin Name is required").notEmpty(),
  body("publisherAdminEmail", "Invalid email format").isEmail(),
  (req, res, next) => {
    try {
      const { publisherAdminName, publisherAdminEmail } = req.body;
      if (publisherAdminEmail || publisherAdminName) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.array()[0].msg
          );
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validatePublisherAdminCreateRequest = [
  body("email", "email is required").notEmpty(),
  body("publisherId", "publisherId is required").notEmpty(),
  body("name", "name is required").notEmpty(),
  body("email", "Invalid email format").isEmail(),
  body("publisherId", "Invalid publisherId format").isUUID(),

  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validateDeleteRequest = [
  param("id", "id parameter is required").notEmpty(),
  param("id", "Invalid parameter id").isUUID(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validateChangePassWordRequest = [
  body("password", "password is required").notEmpty(),
  body("prevPassword", "prevPassword is required").notEmpty(),
  body("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validateSuperAdminUpdateRequest = [
  body("id", "id parameter is required").notEmpty(),
  body("email", "email is required").notEmpty(),
  body("name", "name is required").notEmpty(),
  body("status", "super admin status is required").isBoolean(),
  body("email", "Invalid email format").isEmail(),
  body("id", "Invalid parameter id").isUUID(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      if (!req.user.isPrimeUser) {
        throw new ErrorHandler(
          StatusCodes.BAD_REQUEST,
          `you're not a Prime user to process this request!`
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validatePublisherAdminUpdateRequest = [
  body("id", "id parameter is required").notEmpty(),
  body("email", "email is required").notEmpty(),
  body("publisherId", "publisherId is required").notEmpty(),
  body("name", "name is required").notEmpty(),
  body("status", "publisher admin status is required").isBoolean(),
  body("email", "Invalid email format").isEmail(),
  body("id", "Invalid parameter id").isUUID(),
  body("publisherId", "Invalid publisherId format").isUUID(),

  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(
          StatusCodes.BPublisherAD_REQUEST,
          errors.array()[0].msg
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validatePublisherUpdateRequest = [
  body("id", "id parameter is required").notEmpty(),
  body("name", "name is required").notEmpty(),
  body("publisherSuffix", "publisherSuffix is required").notEmpty(),
  body("status", "Publisher admin status is required").notEmpty(),
  body("id", "Invalid parameter id").isUUID(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validateCurrentUserUpdateRequest = [
  body("name", "name is required").notEmpty(),
  body("email", "email is required").notEmpty(),
  body("email", "Invalid email format").isEmail(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors.array()[0].msg);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

const validatePageLimitRequest = [
  query("page")
    .not()
    .isEmpty()
    .withMessage("page query param is required!")
    .isNumeric()
    .withMessage("page query param must be a number")
    .isInt({ min: 1 })
    .withMessage("page query param must be greater than zero"),
  query("limit")
    .not()
    .isEmpty()
    .withMessage("limit query param is required!")
    .isNumeric()
    .withMessage("limit query param must be a number")
    .isInt({ min: 1 })
    .withMessage("limit query param must be greater than zero"),

  (req, res, next) => {
    try {
      const { page, limit } = req.query;
      if (page || limit) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.array()[0].msg
          );
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  validateLoginRequest,
  validateForgotPassWordRequest,
  validateSuperAdminCreateRequest,
  validatePublisherCreateRequest,
  validatePublisherAdminCreateRequest,
  validateDeleteRequest,
  validateChangePassWordRequest,
  validateSuperAdminUpdateRequest,
  validatePublisherAdminUpdateRequest,
  validatePublisherUpdateRequest,
  validateCurrentUserUpdateRequest,
  validatePageLimitRequest,
  validatePubisherCreateAdminRequest,
};
