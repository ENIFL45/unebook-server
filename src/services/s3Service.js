const s3Client = require("../utils/s3Config");
const logger = require("../utils/logger");
const keys = require("../utils/keys");

const generatePresignedUrl = async (objectKey) => {
  if (!s3Client) {
    logger.info('s3Client does not exist! Probably configuration is missing/invalid');
  }
  const s3Params = {
    Bucket: keys.S3Bucket,
    Key: objectKey,
    Expires:parseInt(86400, 10), // 1 day lease
  }
  return s3Client.getSignedUrl('getObject', s3Params)
}

const uploadObjectHandler =async (fileStream, s3Key) => {
  if (!s3Client) {
    logger.info('s3 does not exist! Probably configuration is missing/invalid')
  }

  const params = {
    Bucket: keys.S3Bucket,
    Key: s3Key, // file name you want to save as
    Body: fileStream,
  }

  s3Client.putObject(params, (err, data) => {
    if (err) {
      logger.info('Error uploading file:', err);
    } else {
      return data?data.key:''
    }
  });
}
const DeleteObjectHandler = async (objectKey) => {
  if (!s3Client) {
    logger.info('s3 does not exist! Probably configuration is missing/invalid')
  }

  const params = {
    Bucket: keys.S3Bucket,
    Key: objectKey,
  };

  s3Client.deleteObject(params, (err, data) => {
    if (err) {
      logger.info('Error deleting object:', err);
    } else {
      logger.info('Object deleted successfully.');
    }
  });
}

module.exports = {
  uploadObjectHandler,
  generatePresignedUrl,
  DeleteObjectHandler,
};
