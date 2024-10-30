const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const verificationEmailTemplate = require("../mail_templates/verificationEmail");
const appointmentConfEmailTemplate = require("../mail_templates/appointmentConfEmail");
const forgotPasswordEmailTemplate = require("../mail_templates/forgotPasswordEmail");

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
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject,
    html: verificationEmailTemplate(text),
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

const appointmentConfirmationEmail = async (
  email,
  subject,
  name,
  serviceProvider,
  service,
  date,
  time
) => {
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
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject,
    html: appointmentConfEmailTemplate(
      name,
      serviceProvider,
      service,
      date,
      time
    ),
  };

  // trigger the email
  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log(`Email sent: ${info.response}`);
  });
};

const forgotPasswordEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject,
    html: forgotPasswordEmailTemplate(text),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log(`Email sent: ${info.response}`);
  });
};

module.exports = {
  sendverificationEmail,
  verifyEmail,
  appointmentConfirmationEmail,
  forgotPasswordEmail,
};
