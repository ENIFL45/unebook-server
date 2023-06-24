const Sequelize = require("sequelize");
const db = require("../utils/database");

const Publishers = db.define("Publisher", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  publisherName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  publisherUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Setup In Progress",
  },
  publisherSuffix: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Publishers;
