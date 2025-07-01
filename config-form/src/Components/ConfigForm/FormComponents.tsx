import "../../App.css";

export const TextComponent = ({ name, label, isRequire, onChange }) => {
  const handleBlur = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input type="text" id={name} name={name} onChange={handleBlur} />
    </div>
  );
};

export const PasswordComponent = ({ name, label, isRequire, onChange }) => {
  const handleBlur = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input type="password" id={name} name={name} onChange={handleBlur} />
    </div>
  );
};

export const CheckboxComponent = ({ name, label, isRequire, onChange }) => {
  return (
    <div className="fieldContainer">
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
    </div>
  );
};

export const RadioComponent = ({
  name,
  label,
  options,
  isRequire,
  onChange,
}) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      {options.map((option) => (
        <span key={option}>
          <input
            type="radio"
            name={name}
            id={option}
            value={option}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={option}>{option}</label>
        </span>
      ))}
    </div>
  );
};

export const DateComponent = ({ name, label, isRequire, onChange }) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="MM/DD/YYYY"
      />
    </div>
  );
};

export const SliderComponent = ({
  name,
  label,
  isRequire,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type="range"
        id={name}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
      />
    </div>
  );
};

export const SelectComponent = ({
  name,
  label,
  options,
  isRequire,
  onChange,
}) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <select
        id={name}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const MultySelectComponent = ({
  name,
  label,
  options,
  isRequire,
  onChange,
}) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <select
        id={name}
        onChange={(e) => {
          const selectedList = [];
          console.log(e.target.options);
          for (let i = 0; i < e.target.options.length; i++) {
            const option = e.target.options[i];
            if (option.selected) {
              selectedList.push(option.value);
            }
          }
          onChange(selectedList);
        }}
        multiple={true}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
