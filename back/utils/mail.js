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
    from: process.env.ADMIN_EMAIL,
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
    html: `Hello Mr./Miss. ${name}. 
    <br> 
    Your appointment with ${serviceProvider} for ${service} on ${date} at ${time} is confirmed. 
    <br> 
    Thaks and regards,
    ${serviceProvider}
    `,
  };

  // trigger the email
  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log(`Email sent: ${info.response}`);
  });
};

const forgotPasswordEmail = async () => {};

module.exports = {
  sendverificationEmail,
  verifyEmail,
  appointmentConfirmationEmail,
  forgotPasswordEmail,
};
