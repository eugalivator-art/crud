import React, { Component } from "react";
import { toast } from "react-toastify";
import Axios from "axios";
const API = "http://localhost:4500";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
    this.user = React.createRef();
    this.pass = React.createRef();
    this.submitHandler = this.submitHandler.bind(this);
  }

  // read all user data
  componentWillMount() {
    Axios.get(`${API}/users`)
      .then((res) => {
        console.log("user", res.data);
        this.setState({
          userInfo: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  validatePass(data) {
    if (data.length < 4) {
      toast.warning("Password must be greterthan 4 digits");
      return false;
    }
    return true;
  }

  authentication(data) {
    const users = this.state.userInfo;
    return users.find(
      (x) => x.username === data.username && x.password === data.password
    );
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.validatePass(this.pass.current.value)) {
      const body = {
        username: this.user.current.value,
        password: this.pass.current.value,
      };
      console.log("data", body);
      // authentication
      if (this.authentication(body)) {
        localStorage.setItem("user", body.username);
        toast.success("Successfully Login");
        window.location = "http://localhost:3000";
      } else {
        toast.warning("Unable to Login, Check your username and Password");
        return;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 jumbotron text-center">
            <h3>Login</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-md-offset-3 well well-lg">
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="user">Username</label>
                <input
                  type="email"
                  name="user"
                  id="user"
                  ref={this.user}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  ref={this.pass}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-warning">
                  Login
                </button>
                <button type="reset" className="btn btn-danger pull-right">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
