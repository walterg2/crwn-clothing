import React from "react";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({email: "", password: "" })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <p>Sign in with your email and password</p>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            label="email"
            value={ this.state.email }
            required
            handleChange={this.handleChange} />
            <FormInput
              type="password"
              name="password"
              label="password"
              value={ this.state.password }
              required
              onChange={this.handleChange} />

          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>
    )
  }
};

export default SignIn;