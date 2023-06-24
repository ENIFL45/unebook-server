const nodemailer = require("nodemailer");
const keys = require("../utils/keys");

const sendEmail = async ({ to, cc, subject, html ,attachments}) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const mode = keys.mode === "production" ? true : false;

    const devAuth = {
      user: testAccount.user,
      pass: testAccount.pass,
    };

    const prodAuth = {
      user: keys.mailAuth,
      pass: keys.mailPass,
    };

    let transporter = nodemailer.createTransport({
      host: keys.mailHost,
      port: keys.mailPort,
      secure: mode,
      auth: mode ? prodAuth : devAuth,
    });

    let mailOptions = {
      from: keys.mailFrom,
      to: to,
      cc: cc,
      subject: subject,
      html: html,
      ...attachments && { attachments : attachments }
    };

    const sendMail = async () => {
      try {
        const info = await transporter.sendMail(mailOptions);
        return mode ? info.messageId : nodemailer.getTestMessageUrl(info);
      } catch (err) {
        return err;
      }
    };

    const uri = await sendMail();
    return uri;
  } catch (err) {
    return err;
  }
};

module.exports = sendEmail;
