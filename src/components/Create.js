import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:4500";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.image = React.createRef();
    this.fee = React.createRef();
    this.duration = React.createRef();
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const body = {
      title: this.title.current.value,
      image: this.image.current.value,
      fee: this.fee.current.value,
      duration: this.duration.current.value,
    };

    console.log("data", body);
    //logic to store data into server
    Axios.post(`${API}/course`, body)
      .then((res) => {
        toast.success("Successfully created");
        window.location = "http://localhost:3000";
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 jumbotron text-center">
            <h3>Create</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-md-offset-3 well well-lg">
            <form
              onSubmit={this.submitHandler}
              method="post"
              autoComplete="off"
            >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  ref={this.title}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  className="form-control"
                  ref={this.image}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fee">Fee</label>
                <input
                  type="number"
                  name="fee"
                  id="fee"
                  className="form-control"
                  ref={this.fee}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  className="form-control"
                  ref={this.duration}
                  required
                />
              </div>

              <div className="form-group">
                <input type="submit" value="Create" className="btn btn-info" />
                <input type="reset" value="Cancel" className="btn btn-danger" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
