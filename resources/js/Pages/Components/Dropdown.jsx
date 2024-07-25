export default function Dropdown({
    defaultMessage = "Choose an option",
    name,
    label,
    options,
    defaultValue = "message",
    onChange,
}) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                className="select select-bordered w-full"
                defaultValue={defaultValue ? defaultValue : "message"}
                onChange={onChange}
            >
                <option key="message" value="message" disabled>
                    {defaultMessage}
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
