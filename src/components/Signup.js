import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:4500";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      userInfo: [],
    };
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    Axios.get(`${API}/users`)
      .then((res) => {
        this.setState({
          userInfo: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  checkUser() {
    const users = this.state.userInfo;
    return users.find((x) => x.username === this.state.user);
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }

  onChangePass(e) {
    this.setState({
      pass: e.target.value,
    });
  }

  submitHandler(e) {
    e.preventDefault(); // avoid page refresh on submit
    const body = {
      username: this.state.user,
      password: this.state.pass,
    };
    console.log("data", body);
    if (this.checkUser()) {
      toast.warning("User already exists");
    } else {
      // http post method
      Axios.post(`${API}/users`, body)
        .then((res) => {
          toast.success("Successfully registered");
          window.location = "http://localhost:3000";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 jumbotron text-center">
            <h3>Signup</h3>
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
                  className="form-control"
                  value={this.state.user}
                  onChange={this.onChangeUser}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  className="form-control"
                  value={this.state.pass}
                  onChange={this.onChangePass}
                />
              </div>

              <div className="form-group">
                <input type="submit" value="SignUp" className="btn btn-info" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
