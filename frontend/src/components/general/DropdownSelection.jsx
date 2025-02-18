export default function DropdownSelection({ label, name, selectValue, optionValues, onChange }) {       
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select name={name} id={name} value={selectValue} onChange={onChange} className="form-select">
                {
                    optionValues.map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))
                }
            </select>
        </div>
    )
}