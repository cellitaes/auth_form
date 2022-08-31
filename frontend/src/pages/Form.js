import { React } from "react";
import { useHistory } from "react-router-dom";

import Button from "../shared/components/FormElements/Button";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import ImageUpload from "../shared/components/FormElements/ImageUpload";
import MultiCheckbox from "../components/MultiCheckbox";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MAX_DATE,
} from "../shared/util/validators";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";

import "./Form.css";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

const Form = () => {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      surname: {
        value: "",
        isValid: false,
      },
      birthdate: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      male: {
        value: "",
        isValid: true,
        gender: "male",
      },
      female: {
        value: "",
        isValid: true,
        gender: "female",
      },
      other: {
        value: "",
        isValid: true,
        gender: "other",
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const { male, female, other } = formState.inputs;

  const checkboxGenderCounter = +male.value + +female.value + +other.value;

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", formState.inputs.email.value);
    formData.append("name", formState.inputs.name.value);
    formData.append("surname", formState.inputs.surname.value);
    formData.append("birthdate", formState.inputs.birthdate.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("image", formState.inputs.image.value);
    for (const [key, value] of Object.entries(formState.inputs)) {
      if (value.gender && value.value) {
        formData.append("gender", value.gender);
      }
    }

    const response = await sendRequest(
      "http://localhost:5000/api/auth",
      "POST",
      formData
    );
    history.push("/");
  };

  return (
    <div className="auth-form">
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverLay />}
      <Card className="authentication">
        <form onSubmit={handleSignUp}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a name with at least 3 characters."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="surname"
            type="text"
            label="Your Surname"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a surname with at least 3 characters."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Your Pasword"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(6),
              VALIDATOR_MAXLENGTH(24),
            ]}
            errorText="Please enter a password not shorter than 6 characters and not longer than 24"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="Your Email"
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="birthdate"
            type="date"
            label="Your Birth Date"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MAX_DATE(
                new Date().toLocaleDateString().split(".").reverse().join("-")
              ),
            ]}
            errorText="Please enter a date of birth (which is earlier than today)."
            onInput={inputHandler}
            max={new Date().toLocaleDateString().split(".").reverse().join("-")}
          />
          <MultiCheckbox
            formState={formState}
            inputHandler={inputHandler}
            checkboxGenderCounter={checkboxGenderCounter}
            errorText="You should choose at most one option."
          />
          <ImageUpload center id="image" onInput={inputHandler} />
          <Button disabled={checkboxGenderCounter > 1 || !formState.isValid}>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Form;
