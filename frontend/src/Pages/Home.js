import { useState } from "react";
import InputNames from "../components/InputNames";

export default function Home(){

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event, names, emails, setError) => {
    if(!submitted){
      event.preventDefault();

    const namesList = {
      namesList: names
    }

    const response = await fetch("/api/assignments/generate", {
        method: 'POST',
        body: JSON.stringify(namesList),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      // create email template objects {to, emailTo} and make call to /send-emails. Each email will contain who each person is buying for
      console.log(json)
      setSubmitted(true);
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
      //<AssignmentsDisplay><AssignmnentsDisplay/>
    );
  }else{
    return (
      <div className="home">
        <div className = "input-names">
          <InputNames onSubmit = {handleSubmit}></InputNames>
        </div>
        <div>
          <p>Submitted!</p>
        </div>
        <div className="footer"></div>
      </div>
      //<AssignmentsDisplay><AssignmnentsDisplay/>
    );
  }
}