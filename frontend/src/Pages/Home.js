import { useState } from "react";
import InputNames from "../components/InputNames";

export default function Home(){

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event, names, emails, additionalText, organizerName, setError) => {
    if(!submitted){
      setSubmitted(true);
      window.scrollTo({top: window.innerHeight, behavior:"smooth"})
      const participantArray = [];
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const email = emails[i];
        const participantObject = { name, email };
        participantArray.push(participantObject);
      }
      console.log(participantArray)
      
      event.preventDefault();

      const namesList = {
        namesList: names
      }

      const generateResponse = await fetch("https:www.secret-santa-generator.com/api/assignments/generate", {
          method: 'POST',
          body: JSON.stringify(namesList),
          headers: {
              'Content-Type': 'application/json'
          }
      })

      const json = await generateResponse.json()

      if (!generateResponse.ok) {
        setError(json.error)
      }
      if (generateResponse.ok) {
        // create email template objects {emailTo, respectiveAssignment} and make call to /send-emails. Each email will contain who each person is buying for
        const emailTemplates = [];
        json.forEach((element) => {
          const { to, from } = element;
          participantArray.forEach((element) => {
            const {name, email} = element;
            if (name === from){
              emailTemplates.push({email, to});
            }
          })
        });
        console.log(emailTemplates)

        // make API call to send emails
        const body = {
          subject: "Your Secret Santa Assignment!",
          message: additionalText,
          emailTemplates: emailTemplates,
          organizerName: organizerName
        }

        const emailResponse = await fetch("https:www.secret-santa-generator.com/api/assignments/send-emails", {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    }
    

  }

  if (!submitted){
    return (
      <div className="home">
        <div className = "input-names">
          <InputNames onSubmit = {handleSubmit}></InputNames>
        </div>
        <div className="footer"></div>
      </div>
    );
  }else{
    return (
      <div className="home">
        <div className = "input-names">
          <InputNames onSubmit = {handleSubmit}></InputNames>
        </div>
        <div className="submitted">
          <p>Emails sent!</p>
          <p>If you did not receive emails with your assignments, please reload and ensure emails were typed correctly.</p>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}