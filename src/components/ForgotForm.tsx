import React, { Component } from "react";
import { Link } from "react-router-dom";

class ForgotForm extends Component {
  render() {
    return (
      <div className="block-wrap">
        <div className="logo-wrap">
          <svg className="logo" width="96" height="96" viewBox="0 0 176 176">
            <g fillRule="evenodd" clipRule="evenodd">
              <circle cx="88" cy="88" r="88" fill="#fff"/>
              <path
                d="M152.37 87.885c0-34.066-27.182-63.42-59.45-64.854-6.416-.284-12.647 1.432-17.58 5.573-5.002 4.196-8.07 10.09-8.638 16.595C65.43 59.73 78.537 68.618 91.225 72.09c30.69 8.398 48.462 30.086 46.655 56.757 9.057-11.194 14.49-25.442 14.49-40.962zM84.345 97.24c-28.696-7.853-45.817-29.174-43.62-54.317.027-.287.073-.567.102-.852C29.19 53.846 22 70.023 22 87.886c0 34.348 27.955 63.828 60.277 64.933 7.227.248 14.214-1.685 19.766-6.344 5.67-4.757 9.146-11.435 9.79-18.808 1.703-19.463-16.492-27.417-27.488-30.426z"
                fill="#4895d9"
              />
            </g>
          </svg>
        </div>
        <h1>Forgot your password?</h1>
        <form className="default_form">
          <input
            placeholder="Email"
            name="email"
            className="email default_input"
            type="text"
          />
          <div className="btn-wrap">
            <button className="btn btn-primary flex-alignment" type="submit">
              Remind me
            </button>
          </div>
        </form>
        <p className="login-p">
          Remembered your password? <Link to="/login">Log in</Link>
        </p>
      </div>
    );
  }
}

export default ForgotForm;
