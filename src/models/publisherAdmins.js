const Sequelize = require("sequelize");
const db = require("../utils/database");

const PublisherAdmins = db.define("PublisherAdmin", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  adminName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  publisherId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  publisherName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emailVerfied: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = PublisherAdmins;
