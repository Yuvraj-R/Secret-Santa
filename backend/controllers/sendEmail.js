require("dotenv").config();

const nodemailer = require("nodemailer")

const sendEmail = async (emailTo, subject, message) => {
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });

      let info = await transporter.sendMail({
        from: '"Secret Santa"', 
        to: emailTo,
        subject: subject, 
        text: message,
      });

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Your function executed successfully!',
            data: {
                messageId: info.messageId,
                previewURL: nodemailer.getTestMessageUrl(info)
            },
          },
          null,
          2
        ),
      };
}

module.exports = sendEmail;