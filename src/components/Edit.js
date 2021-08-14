import Axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";

const API = "http://localhost:4500";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: "",
      image: "",
      fee: 0,
      duration: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  //read the data from server
  componentWillMount() {
    Axios.get(`${API}/course/${this.state.id}`)
      .then((res) => {
        console.log("single", res.data);
        this.setState({
          title: res.data.title,
          image: res.data.image,
          fee: res.data.fee,
          duration: res.data.duration,
        });
      })
      .catch((err) => console.log(err));
  }

  submitHandler(e) {
    e.preventDefault();
    const body = {
      title: this.state.title,
      image: this.state.image,
      fee: this.state.fee,
      duration: this.state.duration,
    };
    console.log("update", body);
    Axios.patch(`${API}/course/${this.state.id}`, body)
      .then((res) => {
        toast.success("Successfully updated");
        window.location = "http://localhost:3000";
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 jumbotron text-center">
            <h3>Edit Course {this.state.id} </h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-md-offset-3 well well-lg">
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={this.state.image}
                  onChange={(e) => this.setState({ image: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fee">Fee</label>
                <input
                  type="number"
                  name="fee"
                  id="fee"
                  value={this.state.fee}
                  onChange={(e) => this.setState({ fee: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={this.state.duration}
                  onChange={(e) => this.setState({ duration: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
