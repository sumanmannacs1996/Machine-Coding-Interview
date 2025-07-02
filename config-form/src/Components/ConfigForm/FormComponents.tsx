import "../../App.css";

type FieldProps = {
  name: string;
  label: string;
  isRequire: boolean;
  onChange: (value: any) => void;
  value: any;
  options?: string[];
  min?: number;
  max?: number;
};

export const TextComponent = ({
  name,
  label,
  isRequire,
  onChange,
  value,
}: FieldProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        onChange={handleBlur}
        value={value}
      />
    </div>
  );
};

export const PasswordComponent = ({
  name,
  label,
  isRequire,
  onChange,
  value,
}: FieldProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type="password"
        id={name}
        name={name}
        onChange={handleBlur}
        value={value}
      />
    </div>
  );
};

export const CheckboxComponent = ({
  name,
  label,
  isRequire,
  onChange,
  value,
}: FieldProps) => {
  return (
    <div className="fieldContainer">
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        checked={value}
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
  options = [],
  isRequire,
  onChange,
  value,
}: FieldProps) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      {options.map((option: string) => (
        <span key={option}>
          <input
            type="radio"
            name={name}
            id={option}
            value={option}
            onChange={(e) => onChange(e.target.value)}
            checked={value === option}
          />
          <label htmlFor={option}>{option}</label>
        </span>
      ))}
    </div>
  );
};

export const DateComponent = ({
  name,
  label,
  isRequire,
  onChange,
  value,
}: FieldProps) => {
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
        value={value}
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
  value,
}: FieldProps) => {
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
        value={value}
        min={min}
        max={max}
      />
    </div>
  );
};

export const SelectComponent = ({
  name,
  label,
  options = [],
  isRequire,
  onChange,
  value,
}: FieldProps) => {
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
        value={value}
      >
        <option key={"unselected"} value="" selected disabled>
          Select One Options
        </option>
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
  options = [],
  isRequire,
  onChange,
  value,
}: FieldProps) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={name}>
        {label}
        {isRequire && <span style={{ color: "red" }}>*</span>}
      </label>
      <select
        id={name}
        onChange={(e) => {
          const options = [...e.target.selectedOptions];
          const values = options.map((option) => option.value);
          onChange(values);
        }}
        multiple={true}
        value={value}
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
