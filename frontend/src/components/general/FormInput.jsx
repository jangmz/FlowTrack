export default function FormInput({ inputName, inputType, labelText, inputValue, onChange }) {

    return (
        <div className="mb-3">
            <label htmlFor={inputName} className="form-label">{labelText}</label>
            <input onChange={onChange} type={inputType} name={inputName} id={inputName} value={inputValue} className="form-control" />
        </div>
    )
}