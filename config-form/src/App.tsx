import { useState } from "react";
import * as yup from "yup";
import "./App.css";
import ConfigForm from "./Components/ConfigForm";

const userDetailsSchema = [
  {
    component: "TEXT_FEILD",
    name: "name",
    label: "Enter Your Name",
    isRequire: true,
    validate: yup.string().required("Name is Require"),
    type: "text",
    defaultValue: "",
  },
  {
    component: "TEXT_FEILD",
    name: "email",
    label: "Enter Your Email",
    isRequire: true,
    validate: yup
      .string()
      .email("Invalid Email Adress Provided")
      .required("Email is Require"),
    type: "text",
    defaultValue: "",
  },
  {
    component: "PASSWORD_FEILD",
    name: "password",
    label: "Enter Your Password",
    isRequire: true,
    validate: yup
      .string()
      .required("Password is Require")
      .min(8, "Password Must Be Atleast 8 Characters"),
    type: "password",
    defaultValue: "",
  },
  {
    component: "PASSWORD_FEILD",
    name: "conform_password",
    label: "Conform Your Password",
    isRequire: true,
    validate: yup
      .string()
      .oneOf([yup.ref("password")], "Conform Password Must Match")
      .required("Conform Password is Require"),
    type: "password",
    defaultValue: "",
  },
  {
    component: "RADIO_BUTTON",
    name: "gender",
    label: "Select Your Gender",
    isRequire: true,
    options: ["Male", "Female", "Other"],
    validate: yup.string().required("Gender is Require"),
    type: "radio",
    defaultValue: undefined,
  },
  {
    component: "DATE_PICKER",
    name: "dob",
    label: "Enter Your Birth Date",
    isRequire: true,
    validate: yup.date().required("Birth Date is Require"),
    type: "date",
    defaultValue: undefined,
  },
  {
    component: "SELECT_FEILD",
    name: "job-type",
    label: "Please Select Your Current Job Type.",
    isRequire: true,
    options: ["Part Time", "Full Time", "Contarctual"],
    validate: yup
      .string()
      .oneOf(
        ["Part Time", "Full Time", "Contarctual"],
        'Job Type Must Be One Of "Part Time", "Full Time", "Contarctual"'
      )
      .required("Job Type Is Require"),
    type: "select",
    defaultValue: "",
  },
  {
    component: "MULTI_SELECT_FEILD",
    name: "technology",
    label: "Please Select Your Technologies.",
    isRequire: true,
    options: ["JavaScript", "React", "Vue", "Angular"],
    validate: yup
      .array()
      .min(1, "Please select at least one option") // Minimum one item selected
      .of(yup.string().required("Option is required")) // Each selected option must be a string and required
      .required("Technologies Are Required"), // The entire array field is required,
    type: "select",
    defaultValue: [],
  },
  {
    component: "SLIDER_FEILD",
    name: "rating",
    label: "Select Your Rating",
    isRequire: true,
    min: 1,
    max: 5,
    validate: yup
      .number()
      .min(0, "Ratting must be atleast 1")
      .max(5, "Ratting must not more than 5"),
    type: "range",
    defaultValue: "0",
  },
  {
    component: "CHECKBOX",
    name: "accept-term",
    label: "I Accept The Term And Condition.",
    isRequire: true,
    validate: yup
      .bool()
      .oneOf([true], "You Must Accept The Term And Condition")
      .required("Please Accept The Term And Condition"),
    type: "date",
    defaultValue: false,
  },
];

export type fieldSchemaType = {
  component: string;
  name: string;
  label: string;
  isRequire: boolean;
  validate: object;
  type: string;
  defaultValue: any;
};

function App() {
  const onSubmit = (submitedData: Object) => {
    console.log("Fprm Successfullt Submited With The Data", submitedData);
  };
  const onReset = () => {};
  return (
    <div className="app-container">
      <ConfigForm
        schema={userDetailsSchema}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </div>
  );
}

export default App;
