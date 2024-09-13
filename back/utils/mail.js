const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendverificationEmail = (email, subject, text) => {
  // creating the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // setting the email options
  const mailOptions = {
    from: "info@abs.com",
    to: email,
    subject,
    html: `Please verfiy your email via this link: <a href="${text}" target="_blank">Verify email</a>`,
  };

  // triggering the mail
  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log(`Email sent: ${info.response}`);
  });
};

const verifyEmail = async (verificationToken) => {
  const userDetails = await jwt.verify(
    verificationToken,
    process.env.JWT_SECRET
  );

  return userDetails ? userDetails : false;
};

module.exports = { sendverificationEmail, verifyEmail };
