import React from "react";
import "../../App.css";
import {
  CheckboxComponent,
  DateComponent,
  MultySelectComponent,
  PasswordComponent,
  RadioComponent,
  SelectComponent,
  SliderComponent,
  TextComponent,
} from "./FormComponents";

const COMPONENT_MAPPING = {
  TEXT_FEILD: TextComponent,
  PASSWORD_FEILD: PasswordComponent,
  RADIO_BUTTON: RadioComponent,
  DATE_PICKER: DateComponent,
  SELECT_FEILD: SelectComponent,
  MULTI_SELECT_FEILD: MultySelectComponent,
  SLIDER_FEILD: SliderComponent,
  CHECKBOX: CheckboxComponent,
};

function FormField({ field, error, value, onChange }) {
  const Componenet = COMPONENT_MAPPING[field.component];
  if (Componenet) {
    return (
      <div className="inputContainer">
        <Componenet
          {...field}
          onChange={(value) => onChange(field.name, value)}
          value={value}
        />
        {error && (
          <span style={{ color: "red", textAlign: "center" }}>{error}</span>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default FormField;
