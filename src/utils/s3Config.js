const AWS = require("aws-sdk");
const keys = require("../utils/keys");

const S3URL = `${keys.S3Protocol}://${keys.S3Host}${
  keys.S3Port ? `:${keys.S3Port}` : ""
}`;
const s3Client = new AWS.S3({
  signatureVersion: "v4",
  accessKeyId: keys.S3AccessKeyId,
  secretAccessKey: keys.S3SecretAccessKey,
  s3ForcePathStyle: true,
  endpoint: S3URL,
  region: keys.S3Region
});

module.exports = s3Client;
