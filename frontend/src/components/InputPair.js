export default function InputPair( {Index, nameRefs, emailRefs, onNameChange, onEmailChange} ){
    let namePlaceHolder = `Participant ${Index}`;
    let emailPlaceHolder = `Participant ${Index}'s email address`;
    if (Index === 0){
        namePlaceHolder = "Your Name"
        emailPlaceHolder = "Your Email Address"
    }
    return (
        <span className="input-pair">
            <input
            className="input"
            ref = {nameRefs.current[Index]}
            placeholder={namePlaceHolder}
            onChange={(event) => {onNameChange(Index, event.target.value)}}
            ></input>
            <input
            className="input"
            ref = {emailRefs.current[Index]}
            placeholder={emailPlaceHolder}
            onChange={(event) => {onEmailChange(Index, event.target.value)}}
            ></input>
        </span>
    )
}