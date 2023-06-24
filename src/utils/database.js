const Sequelize = require("sequelize");
const keys = require("./keys");

const sequelize = new Sequelize(keys.pgDatabase, keys.pgUser, keys.pgPassword, {
  host: keys.pgHost,
  dialect: "postgres",
  port: 5432,
  logging: false,
  dialectOptions: {
    useUTC: true,
    timezone: "+00:00",
  },
  pool: {
    max: 100,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
