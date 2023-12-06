import { useState } from "react";
import { useRef } from "react";
import InputPair from "./InputPair";
const React = require('react')

export default function InputNames(){

  const handleNameInputChange = async (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const handleEmailInputChange = async (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

    const [names, setNames] = useState([]);
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [numInputs, setNumInputs] = useState(6);
    const [message, setMessage] = useState('');

    const nameRefs = useRef([]);
    const emailRefs = useRef([])
    nameRefs.current[0] = React.createRef();
    emailRefs.current[0] = React.createRef();

    const inputElements = []
    for (let index = 1; index < numInputs; index++){
      nameRefs.current[index] = nameRefs.current[index] || React.createRef();
      emailRefs.current[index] = emailRefs.current[index] || React.createRef();

        inputElements.push(
            <InputPair
            nameRefs={nameRefs}
            emailRefs= {emailRefs}
            key = {index}
            Index = {index}
            onNameChange = {handleNameInputChange}
            onEmailChange = {handleEmailInputChange}
            ></InputPair>
        )
        }

    const handleSubmit = async (event) => {
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
        console.log(json)
    }

    }

    const addInput = () => {
        setNumInputs(numInputs+1)
    }

    const clearInputs = () => {
      nameRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.value = "";
        }
      });
      emailRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.value = "";
        }
      });
      setNumInputs(6);
    };


    return (
        <form className="input-form">
          <h3>Input Participant Names</h3>
          <p>Spread the holiday magic with our awesome Secret Santa generator. Easily plan your gift exchange and let the festive fun begin!</p>
          <div className="inputs">
            <h5 className="input-label">Your Name:</h5>
            <input
              className="name-input"
              ref={nameRefs.current[0]}
              placeholder={`Your Name`}
              onChange={(event) => {handleNameInputChange(0, event.target.value)}}>
            </input>
            <h5 className="input-other-label">Other Participants:</h5>
            {inputElements}
            <div className="form-controls">
              <button className="add-participant-button" type="button" onClick={addInput}>
                Add Participant
             </button>
             <button className="clear-inputs-button"type="button" onClick={clearInputs}>
               Clear
             </button>
            </div>
            <div className="text-input">
              <h5 className="input-message-label">Add a message:</h5>
              <textarea
              className="message-input"
              placeholder="Type Message Here"
              rows={5}
              maxLength={255}
              onChange={(event) => {setMessage(event.target.value)}}></textarea>
            </div>
          </div>
          <div className="form-submit" onClick={handleSubmit}>
            <input type="submit" />
          </div>
        </form>
      );
}