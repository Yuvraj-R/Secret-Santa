require("dotenv").config();

const nodemailer = require("nodemailer");

const sendEmail = async (emailTo, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const info = await transporter.sendMail({
      from: '"Secret Santa" <santa.generator2023@gmail.com>',
      to: emailTo,
      subject: subject,
      text: message,
    });

    console.log('Message sent: %s', info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Your function executed successfully!',
          data: {
            messageId: info.messageId,
            previewURL: nodemailer.getTestMessageUrl(info),
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: 'Internal Server Error',
          message: 'An error occurred while sending the email.',
        },
        null,
        2
      ),
    };
  }
};

module.exports = sendEmail;