const nodemailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_USER_ADDRESS
} = require("../config");

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: (EMAIL_PORT == 465) ? true : false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

module.exports = async (recoveryCode: string, email: string) => {
  const info = await transporter.sendMail({
    from: `"Irvin Raul Lopez 👻" <${EMAIL_USER_ADDRESS}>`,
    to: email,
    subject: "Correo de recuperación",
    html: `<p>Tu nuevo password es el siguiente: <b>${recoveryCode}</b></p>`,
  });

  console.log("Message sent: %s", info.messageId);
};