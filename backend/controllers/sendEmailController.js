const sendEmail = require("./sendEmail")

const sendEmailFacilitator = async (req, res) => {
    // emailTemplates should be an array of {to, emailTo} objects
    const { to, subject, message, emailTemplates} = req.body;

    // note message is optional
    if (!to || !subject || !emailTemplates){
        return res.status(400).json({
            error: "One or more sendEmailFacilitator() fields is missing",
          });
    }

    /*
    For each emailTemplate, call sendEmail(emailTo, "Your Secret Santa Assignment", message)
    Return status code 400 if any of them do not return a response for an email
    */

    return res.status(200)
}

module.exports = {sendEmailFacilitator};