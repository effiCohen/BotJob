const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (email, subject, text) => {
  // initialize and define the mode of transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // Replace with your Gmail email address
      pass: process.env.PASS, // Replace with your Gmail password or an application-specific password
    },
  });

  // Set up email data
  const mailOptions = {
    from: process.env.USER, // Replace with your Gmail email address
    to: email, // Replace with the recipient's email address
    subject: subject,
    text: text,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log(" The message with code : " + text + " sent to : " + email);
    // console.log(info.response);
  });
};
