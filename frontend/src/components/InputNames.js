import { useState } from "react";
import { useRef } from "react";
const React = require('react')

export default function InputNames(){
    const [names, setNames] = useState([]);
    const [error, setError] = useState(null);
    const [numInputs, setNumInputs] = useState(5);

    const inputRefs = useRef([]);
    inputRefs.current[0] = React.createRef();

    const inputElements = []
    for (let index = 1; index < numInputs; index++){
      inputRefs.current[index] = inputRefs.current[index] || React.createRef();

        inputElements.push(
            <input
            key = {index}
            ref={inputRefs.current[index]}
            placeholder={`Participant ${index+1}`}
            onChange={(event) => {handleInputChange(index, event.target.value)}}>
            </input>
        )
    }

    const handleInputChange = async (index, value) => {
        const updatedNames = [...names];
        updatedNames[index] = value;
        setNames(updatedNames);
      };

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
      inputRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.value = "";
        }
      });
    };


    return (
        <form className="input-form" onSubmit={handleSubmit}>
          <h3>Input Participant Names</h3>
          <p>Spread the holiday magic with our awesome Secret Santa generator. Easily plan your gift exchange and let the festive fun begin!</p>
          <div className="inputs">
          <input
            ref={inputRefs.current[0]}
            placeholder={`Your Name`}
            onChange={(event) => {handleInputChange(0, event.target.value)}}>
            </input>
          {inputElements}
          </div>
          <div className="form-controls">
          <button type="button" onClick={clearInputs}>
              Clear
            </button>
            <button type="button" onClick={addInput}>
              Add Participant
            </button>
            <input type="submit" />
          </div>
        </form>
      );
}