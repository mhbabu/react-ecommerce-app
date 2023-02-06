import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";
import { withLocation } from "./../utils/withLocation";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().min(5).max(255).required().label("Username"),
    password: Joi.string().trim().min(5).max(255).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { redirectUrl } = this.props;
      if (redirectUrl) window.location = redirectUrl.state.from.pathname;
      else window.location = "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className='mt-5 py-5'>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-md-8'>
              <h1>Login</h1>
              {this.renderInput("username", "Username", "email")}
              {this.renderInput("password", "Passowrd", "password")}
            </div>
            <div className='col-md-8'>
              <div className='mb-3'>{this.renderButton("Login")}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withLocation(Login);
