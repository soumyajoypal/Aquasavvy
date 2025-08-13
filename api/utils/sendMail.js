const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;


const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
