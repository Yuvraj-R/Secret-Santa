export default function InputPair( {Index, nameRefs, emailRefs, onNameChange, onEmailChange} ){
    return (
        <span className="input-pair">
            <input
            className="input"
            ref = {nameRefs.current[Index]}
            placeholder={`Participant ${Index}`}
            onChange={(event) => {onNameChange(Index, event.target.value)}}
            ></input>
            <input
            className="input"
            ref = {emailRefs.current[Index]}
            placeholder={`Participant ${Index}'s email address`}
            onChange={(event) => {onEmailChange(Index, event.target.value)}}
            ></input>
        </span>
    )
}