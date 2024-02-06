import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (length, checkboxData) => {
    let allowedCharset = "";
    let generatedPassword = "";
    const selectedOptions = checkboxData.filter((cb) => cb.status);

    if (selectedOptions.length === 0) {
      setError("Please seleact at lease one option.");
      setPassword("");
      return;
    }

    selectedOptions.forEach((options) => {
      switch (options.title) {
        case "Include upper case letters":
          allowedCharset = allowedCharset + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include lower case letters":
          allowedCharset = allowedCharset + "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include numbers":
          allowedCharset = allowedCharset + "1234567890";
          break;
        case "Include symbols":
          allowedCharset = allowedCharset + "~!@#$%^&*,.";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedCharset.length);
      generatedPassword = generatedPassword + allowedCharset[randomIndex];
    }
    setPassword(generatedPassword);
    setError("");
  };

  return [password, error, generatePassword];
};

export default usePasswordGenerator;
