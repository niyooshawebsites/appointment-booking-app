const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const verificationEmailTemplate = require;

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
    html: `
      <div style={{}} fontfamily:="" "arial,="" sans-serif",="" maxwidth:="" 600,="" margin:="" "auto",="" padding:="" 20,="" border:="" "1px="" solid="" #ddd",="" borderradius:="" 8,="" backgroundcolor:="" "#f9f9f9"="" }}="">
        <h2 style={{}} color:="" "#333"="" }}="">Hello there,</h2>
        <p style={{}} fontsize:="" 16,="" color:="" "#555"="" }}="">
          Please click the link below to verify your email address:
        </p>
        <a href="#" target="_blank" style={{}} display:="" "inline-block",="" margin:="" "20px="" 0",="" padding:="" "10px="" 20px",="" backgroundcolor:="" "#007bff",="" color:="" "#fff",="" textdecoration:="" "none",="" borderradius:="" 5="" }}="">Verify Email</a>
        <p style={{}} fontsize:="" 14,="" color:="" "#555"="" }}="">
          Thank you and regards,<br />
          <strong>Team - ABS</strong>
        </p>
      </div>
    `,
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
    <br>
    ${serviceProvider}
    <br>
    Team - ABS
    `,
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
    html: `
    Hello there,
    <br> 
    Please click the link to reset your passoword: <a href="${text}" target="_blank">Reset Password</a>
    <br> 
    Thaks and regards,
    <br>
    Team - ABS
    `,
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
