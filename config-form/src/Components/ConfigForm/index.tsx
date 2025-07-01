import React, { useState } from "react";
import * as yup from "yup";
import FormField from "./FormField";
import "../../App.css";

function ConfigForm({ schema, onSubmit, onReset }) {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema = yup.object().shape(
    schema.reduce((acc, field) => {
      if (field.validate) {
        acc[field.name] = field.validate;
      }
      return acc;
    }, {})
  );

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      onSubmit(formData);
    } catch (errors) {
      const validationErrors = errors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setValidationErrors(validationErrors);
    }
  };

  const handelChange = (name: string, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelReset = (e) => {
    e.preventDefault();
    setFormData({});
    setValidationErrors({});
    onReset();
  };

  return (
    <form className="form-container" onSubmit={handleSumit}>
      {schema.map((field, idx) => (
        <FormField
          key={idx}
          field={field}
          error={validationErrors[field.name]}
          value={formData[field.name] || ""}
          onChange={handelChange}
        />
      ))}
      <button type="reset" className="reset-btn" onClick={handelReset}>
        Reset
      </button>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

export default ConfigForm;
