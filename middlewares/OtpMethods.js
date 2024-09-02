const transporter = require("../config/nodemailer");

const twilio = require("twilio");
const { SID, AUTH_TOKEN, PHONE_NUMBER } = process.env;

// Initialize the Twilio client
const client = twilio(SID, AUTH_TOKEN);

const otpStore = new Map();

function storeOTP(email, otp, token) {
  otpStore.set(otp, {
    email,
    otp,
    token,
    expiresAt: Date.now() + 10 * 60 * 1000,
  }); // 10 minutes
}

function getStoredDataByOTP(otp) {
  const otpData = otpStore.get(otp);
  if (!otpData || Date.now() > otpData.expiresAt) {
    otpStore.delete(otp);
    return null;
  }
  return otpData;
}

function sendOtpEmail(email, firstName, otp) {
  const setPasswordLink = `${process.env.FRONT_END_BASE_URL}/set-password?otp=${otp}`;
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Set Your Password",
      html: `
        <p>Hi, ${firstName},</p>
        <p>Click ${setPasswordLink} to set your password. The Link will expire in 10 minutes.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject("Error sending OTP");
      } else {
        console.log("Email sent: " + info.response);
        resolve("OTP sent successfully");
      }
    });
  });
}

function sendOtpSms(to, otp) {
  const setPasswordLink = `${process.env.FRONT_END_BASE_URL}/set-password?otp=${otp}`;
  return new Promise((resolve, reject) => {
    const messageBody = `Hi, your OTP code is ${otp}. Please use this code to complete your authentication process. or Click on ${setPasswordLink}`;

    client.messages
      .create({
        body: messageBody,
        from: PHONE_NUMBER,
        to: "+91" + to,
      })
      .then((message) => {
        console.log("Message SID:", message.sid);
        resolve("OTP sent successfully");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.message);
        reject("Error sending OTP");
      });
  });
}

module.exports = { storeOTP, getStoredDataByOTP, sendOtpEmail, sendOtpSms };
