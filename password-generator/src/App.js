import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hooks/usePasswordGenerator";

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include upper case letters", status: true },
    { title: "Include lower case letters", status: true },
    { title: "Include numbers", status: true },
    { title: "Include symbols", status: true },
  ]);
  const [copied, setCopied] = useState(false);

  const [password, error, generatePassword] = usePasswordGenerator(length);

  const handleCheckboxChange = (index) => {
    const copyData = [...checkboxData];
    copyData[index].status = !copyData[index].status;
    setCheckboxData(copyData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <>
      <div className="container">
        {password && (
          <div className="header">
            <div className="password-text">{password}</div>
            <button className="btn copy-btn" onClick={handleCopy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        <div>
          <div className="char-len-container">
            <span>Charater Length</span>
            <span>{length}</span>
          </div>
          <input
            className="range-input"
            type="range"
            min={4}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="checkbox-container">
          {checkboxData.map((checkbox, idx) => (
            <div className="checkbox" key={checkbox.title}>
              <input
                type="checkbox"
                checked={checkbox.status}
                onChange={() => handleCheckboxChange(idx)}
              />
              <label>{checkbox.title}</label>
            </div>
          ))}
        </div>
        {/* strength */}

        <>{error && <div className="error-message">{error}</div>}</>
        <button
          className="btn btn-generate-password"
          onClick={() => generatePassword(length, checkboxData)}
        >
          Generate password
        </button>
      </div>
      {/* <input type="checkbox" checked={true} />
      <label>Include upper case letters</label> */}
    </>
  );
}

export default App;
