const winston = require("winston");
const clc = require("cli-color");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      let coloredLevel = level === "info" ? clc.green(level) : clc.red(level);
      return `${coloredLevel}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
