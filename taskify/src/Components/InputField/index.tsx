import React, { useRef } from "react";
import "../styles.css";
type inputFieldProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  dispatch: React.Dispatch<any>;
};
function InputField({ input, setInput, dispatch }: inputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input) {
      dispatch({ type: "ADD_TODO", payload: input });
      setInput("");
      inputRef.current?.blur();
    }
  };
  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a task"
        className="input__box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
}

export default InputField;
