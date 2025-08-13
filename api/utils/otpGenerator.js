const moment = require("moment");
const sendEmail = require("./sendMail");

const otpGenerator = async (user, email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresIn = moment().add(10, "minutes").toDate();
  user.otp = otp;
  user.otpExpires = expiresIn;

  await user.save();

  const emailSubject = "Action Required: Verify Your AquaSavvy Account";
 const emailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #f3f4f6; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #0073e6; text-align: center; font-size: 30px; margin-bottom: 25px; font-family: 'Helvetica Neue', sans-serif; letter-spacing: 1px;">Verify Your AquaSavvy Account</h1>
    <p style="font-size: 18px; margin-bottom: 25px; color: #555;">Hello,</p>
    <p style="font-size: 18px; margin-bottom: 25px; color: #555;">Thank you for joining AquaSavvy! To start your journey in learning about groundwater conservation, please use the following One-Time Password (OTP) to verify your email address:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; padding: 20px 40px; font-size: 24px; background-color: #0073e6; color: #fff; border-radius: 10px; font-weight: bold; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); letter-spacing: 2px;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 18px; margin-bottom: 25px; color: #555;">This OTP is valid for the next 10 minutes. If you did not request this verification, please disregard this email.</p>
    <p style="font-size: 18px; color: #555;">Best regards,<br><span style="color: #0073e6; font-weight: bold;">The AquaSavvy Team</span></p>
  </div>
`;

  await sendEmail(email, emailSubject, emailBody);
};

module.exports = otpGenerator;
