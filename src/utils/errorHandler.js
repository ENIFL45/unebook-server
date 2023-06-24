class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res, logger) => {
  let { statusCode } = err;
  let { message } = err;

  if (!statusCode) {
    statusCode = 500;
  }

  function capitalizeFirstLetter(str) {
    return str.replace(/^(.)(.*)$/, function (_, firstLetter, restOfLetters) {
      return firstLetter.toUpperCase() + restOfLetters.toLowerCase();
    });
  }

  if (message === "Validation error") {
    const captilize = capitalizeFirstLetter(err.errors[0].path);
    message = `${captilize} already exists!`;
    statusCode = 400;
  }

  logger.error(message);
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message,
    },
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
