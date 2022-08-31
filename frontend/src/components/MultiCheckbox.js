import { React } from "react";

import Input from "../shared/components/FormElements/Input";
import { VALIDATOR_FIELD_OPTIONAL } from "../shared/util/validators";

import "./MultiChecbox.css";

const MultiCheckbox = (props) => {
  return (
    <div
      className={`${
        props.checkboxGenderCounter > 1 && "gender-wrapper--invalid"
      } gender-wrapper`}
    >
      <label>Gender</label>
      <Input
        element="input"
        id="male"
        type="checkbox"
        label="male"
        validators={[VALIDATOR_FIELD_OPTIONAL()]}
        onInput={props.inputHandler}
      />
      <Input
        element="input"
        id="female"
        label="female"
        type="checkbox"
        validators={[VALIDATOR_FIELD_OPTIONAL()]}
        onInput={props.inputHandler}
      />
      <Input
        element="input"
        id="other"
        label="other"
        type="checkbox"
        validators={[VALIDATOR_FIELD_OPTIONAL()]}
        onInput={props.inputHandler}
      />
      {props.checkboxGenderCounter > 1 && <p className="">{props.errorText}</p>}
    </div>
  );
};

export default MultiCheckbox;
