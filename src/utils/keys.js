module.exports = {
  mode: process.env.NODE_ENV,
  pgUser: process.env.POSTGRES_USER,
  pgHost: process.env.POSTGRES_HOST,
  pgDatabase: process.env.POSTGRES_DB,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgPort: process.env.POSTGRES_PORT,
  serverPort: process.env.SERVER_PORT,
  primaryUserName: process.env.PRIMARY_NAME,
  primaryUserEmail: process.env.PRIMARY_EMAIL,
  primaryUserPassWord: process.env.PRIMARY_PASSWORD,
  secondaryUserName: process.env.SECONDARY_NAME,
  secondaryUserEmail: process.env.SECONDARY_EMAIL,
  secondaryUserPassWord: process.env.SECONDARY_PASSWORD,
  jwrSecretKey: process.env.JWT_SECRET_KEY,
  publisherEmailTo: process.env.PUBLISHER_EMAIL_TO,
  publisherEmailCc: process.env.PUBLISHER_EMAIL_CC,
  mailFrom: process.env.MAIL_FROM,
  mailPort: process.env.MAIL_PORT,
  mailHost: process.env.MAIL_HOST,
  mailAuth: process.env.MAIL_AUTH_USER,
  mailPass: process.env.MAIL_AUTH_PASS,
  mailContactTo: process.env.MAIL_CONTACT_TO,
  mailReportTo: process.env.MAIL_REPORT_TO,
  clientUrl: process.env.CLIENT_URL,
  S3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  S3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  S3Bucket: process.env.S3_BUCKET,
  S3Protocol: process.env.S3_PROTOCOL,
  S3Host: process.env.S3_HOST,
  S3Port: process.env.S3_PORT,
  S3Region: process.env.S3_REGION
};
