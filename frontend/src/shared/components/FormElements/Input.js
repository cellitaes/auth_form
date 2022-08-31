import React, { useReducer, useEffect } from "react";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        checked: action.check,
        isValid: action.validators
          ? validate(action.val, action.validators)
          : action.validity ?? action.isValid,
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};
let emailTimeoutIdx;

const Input = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const init =
    props.type === "checkbox"
      ? {
          checked: props.initialValue || false,
          isTouched: false,
          isValid: props.initialValid || false,
        }
      : {
          value: props.initialValue || "",
          isTouched: false,
          isValid: props.initialValid || false,
        };

  const [inputState, dispatch] = useReducer(inputReducer, init);

  const { id, onInput } = props;
  const { value, checked, isValid } = inputState;

  useEffect(() => {
    onInput({ id, value, checked, isValid });
  }, [id, value, checked, isValid, onInput]);

  const emailDebounce = async (email) => {
    if (!email) {
      return;
    }
    const res = await sendRequest(`/api/email-validator.php?email=${email}`);
    dispatch({
      type: "CHANGE",
      val: email,
      validity: res.validation_status,
    });
  };

  const changeHandler = (event) => {
    if (props.type === "email") {
      clearTimeout(emailTimeoutIdx);
      emailTimeoutIdx = setTimeout(
        () => emailDebounce(event.target.value),
        500
      );
    }
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      check: event.target.checked,
      validators: props.validators,
      isValid: isValid,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element !== "textarea" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        checked={inputState.checked}
        max={props.max}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <LoadingSpinner ringClassName={"lds-dual-ring--reduce-size"} />
      )}
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
