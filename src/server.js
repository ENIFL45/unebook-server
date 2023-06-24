const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");
const keys = require("./utils/keys");
const sequelize = require("./utils/database");
const { handleError } = require("./utils/errorHandler");
const createPrimeUsers = require("./utils/createPrimeUsers");

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb'} ));
app.use(express.urlencoded({limit: '50mb'}));

app.use(morgan("combined", { immediate: true }));

const router = require("./routes/index");

app.use("/", router);

app.use((err, req, res, next) => handleError(err, res, logger));

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    await createPrimeUsers();
    app.listen(keys.serverPort, () => {
      logger.info(`App is listening on port ${keys.serverPort}`);
    });
  } catch (error) {
    logger.error(`Error occurred: ${error.message}`);
  }
};

startServer();

module.exports = app;
