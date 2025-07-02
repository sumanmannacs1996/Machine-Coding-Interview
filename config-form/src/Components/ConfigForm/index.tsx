import React, { useState } from "react";
import * as yup from "yup";
import FormField from "./FormField";
import "../../App.css";
import type { fieldSchemaType } from "../../App";
export type ConfigFormType = {
  schema: fieldSchemaType[];
  onSubmit: (submitedData: any) => {};
  onReset: () => {};
};

function ConfigForm({ schema, onSubmit, onReset }: ConfigFormType) {
  const formDefaultValue: Record<string, any> = schema.reduce(
    (acc: Record<string, any>, field: fieldSchemaType) => {
      acc[field.name] = field.defaultValue;
      return acc;
    },
    {}
  );
  const [formData, setFormData] = useState(formDefaultValue);
  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema: Record<string, any> = yup.object().shape(
    schema.reduce((acc: Record<string, any>, field: fieldSchemaType) => {
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
    } catch (errors: any) {
      const validationErrors: Record<string, any> = errors.inner.reduce(
        (acc: Record<string, any>, error: any) => {
          acc[error.path] = error.message;
          return acc;
        },
        {}
      );
      setValidationErrors(validationErrors);
    }
  };

  const handelChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelReset = (e) => {
    e.preventDefault();
    setFormData({});
    setValidationErrors(formDefaultValue);
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
