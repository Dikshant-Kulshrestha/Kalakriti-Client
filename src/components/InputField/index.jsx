import "./style.css";

const InputField = ({ type, required, label, value, handleChange, icon, innerProps }) => {
  return (
    <div className="InputContainer">
      <label className="InputLabel" htmlFor="input">
        {label}
        {required && <span className="InputRequired"> *</span>}
      </label>
      <div className="InputContainer">
        {type === "input" && (
          <input
            className={`InputField ${icon && "InputPadding"}`}
            value={value}
            onChange={handleChange}
            id="input"
            {...innerProps}
          />
        )}
        {type === "textarea" && (
          <textarea
            className="InputField"
            value={value}
            onChange={handleChange}
            id="input"
            {...innerProps}
          />
        )}

        <div className="InputIcon">{icon}</div>
      </div>
    </div>
  );
};

export default InputField;
