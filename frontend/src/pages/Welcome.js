import { React } from "react";

import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome">
      <p>Welcome onboard!</p>
      <p>Go to register page to sign up new user!</p>
      <p>Every field is mandatory except gender</p>
    </div>
  );
};

export default Welcome;
