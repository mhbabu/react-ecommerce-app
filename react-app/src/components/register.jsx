import Joi from "joi-browser";
import auth from "../services/authService";
import { register } from "../services/registerService";
import Form from "./common/form";

class Register extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().trim().min(3).max(255).required().label("Name"),
    username: Joi.string()
      .trim()
      .email()
      .min(5)
      .max(255)
      .required()
      .label("Username"),
    password: Joi.string().trim().min(5).max(255).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className='mt-5 py-5'>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-md-8'>
              <h1>Register</h1>
              {this.renderInput("name", "Name")}
              {this.renderInput("username", "Username", "email")}
              {this.renderInput("password", "Password", "password")}
            </div>
            <div className='col-md-8'>
              <div className='mb-3'>{this.renderButton("Register")}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
