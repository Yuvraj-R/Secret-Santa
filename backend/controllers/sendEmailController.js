const sendEmail = require("./sendEmail");

const sendEmailFacilitator = async (req, res) => {
    const { subject, additionalMessage, emailTemplates, organizerName } = req.body;

    if (!subject || !emailTemplates || !organizerName) {
        return res.status(400).json({
            error: "One or more sendEmailFacilitator() fields are missing",
        });
    }

    // Function to send emails with a delay between each
    const sendEmailsWithDelay = async () => {
        for (const element of emailTemplates) {
            const { email, to } = element;
            let message = `Your Secret Santa Assignment is: ${to}. Organized by: ${organizerName}.`;
            if (additionalMessage) {
                message += ` Message from organizer: ${additionalMessage}`;
            }

            // Wait for 200 ms before sending the next email
            await new Promise(resolve => setTimeout(resolve, 200));

            try {
                const response = await sendEmail(email, subject, message);
                // Handle the response if needed
            } catch (error) {
                console.error("Error sending email:", error);
                // Handle the error, e.g., log it or mark the email as failed
            }
        }
    };

    // Call the function to send emails with delay
    await sendEmailsWithDelay();

    return res.status(200).json({
        success: true,
    });
};

module.exports = { sendEmailFacilitator };
