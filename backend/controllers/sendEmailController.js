const sendEmail = require("./sendEmail")

const sendEmailFacilitator = async (req, res) => {
    // emailTemplates should be an array of {to, emailTo} objects
    const { subject, additionalMessage, emailTemplates, organizerName} = req.body;

    // note message is optional
    if (!subject || !emailTemplates || !organizerName){
        return res.status(400).json({
            error: "One or more sendEmailFacilitator() fields is missing",
          });
    }

    emailTemplates.forEach((element) => {
        const { email, to } = element;
        const message = "Your Secret Santa Assignment is: " + to + ". Organized by: " + organizerName + ".";
        if(additionalMessage){
            message += " Message from organizer: " + additionalMessage;
        }
        
        // wait 200 ms to send emails
        setTimeout(sendEmail(email, subject, message), 200);
    });

    /*
    For each emailTemplate, call sendEmail(emailTo, "Your Secret Santa Assignment", message)
    Return status code 400 if any of them do not return a response for an email
    */

    return res.status(200)
}

module.exports = {sendEmailFacilitator};