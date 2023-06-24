const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("../utils/database");

const SuperAdmin = db.define("SuperAdmin", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  superAdminName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue("password", hash);
    },
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPrimeUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  emailVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = SuperAdmin;
