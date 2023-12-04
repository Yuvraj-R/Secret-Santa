import { useState } from "react";

export default function InputNames(){
    const [names, setNames] = useState([]);
    const [error, setError] = useState(null);
    const [numInputs, setNumInputs] = useState(5);

    const inputElements = []
    for (let index = 0; index < numInputs; index++){
        inputElements.push(
            <input
            key = {index}
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

        const response = await fetch("/api/generate", {
            method: 'POST',
            body: names,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //const json = await response.json()

    if (!response.ok) {
      //setError(json.error)
    }
    if (response.ok) {
        //console.log(json)
    }

    }

    const addInput = () => {
        setNumInputs(numInputs+1)
    }


    return (
        <form className="inputForm" onSubmit={handleSubmit}>
          <h3>Input Participant Names</h3>
          {inputElements}
          <div>
            <button type="button" onClick={addInput}>
              Add Participant
            </button>
          </div>
          <input type="submit" />
        </form>
      );
}