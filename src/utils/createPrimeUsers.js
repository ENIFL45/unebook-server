const SuperAdmin = require("../models/superAdmin");
const keys = require("./keys");
const logger = require("./logger");

const createSuperAdmin = async () => {
  const user = await SuperAdmin.findOne({
    where: { email: keys.primaryUserEmail },
  });

  if (!user) {
    const PRIMARYUSER_MODEL = {
      superAdminName: keys.primaryUserName,
      email: keys.primaryUserEmail,
      password: keys.primaryUserPassWord,
      isPrimeUser: true,
      createdBy: "Amnet",
      emailVerified: true,
      status: true,
    };

    const primeUser = await SuperAdmin.create(PRIMARYUSER_MODEL);

    if (!primeUser) {
      logger.error("failed to create prime user!");
    } else {
      logger.info("PRIME USER created successfully!");
      logger.info(`email:${keys.primaryUserEmail}`);
      logger.info(`password:${keys.primaryUserPassWord}`);
    }
  }

  const secUser = await SuperAdmin.findOne({
    where: { email: keys.secondaryUserEmail },
  });

  if (!secUser) {
    const SECONDARYUSER_MODEL = {
      superAdminName: keys.secondaryUserName,
      email: keys.secondaryUserEmail,
      password: keys.secondaryUserPassWord,
      createdBy: "Amnet",
      emailVerified: true,
      status: true,
    };

    const secondaryUser = await SuperAdmin.create(SECONDARYUSER_MODEL);

    if (!secondaryUser) {
      logger.error("failed to create secondary user!");
    } else {
      logger.info("SECONDARY USER created successfully!");
      logger.info(`email:${keys.secondaryUserEmail}`);
      logger.info(`password:${keys.secondaryUserPassWord}`);
    }
  }
};

module.exports = createSuperAdmin;
