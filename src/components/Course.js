import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API = "http://localhost:4500";

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: [],
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentWillMount() {
    Axios.get(`${API}/course`)
      .then((res) => {
        console.log("data", res.data);
        this.setState({
          courseInfo: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteHandler(id) {
    console.log("id", id);
    const del = window.confirm("Are you sure to delete?");
    if (del) {
      Axios.delete(`${API}/course/${id}`)
        .then((res) => {
          toast.success("Successfully deleted");
          window.location = "http://localhost:3000";
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 jumbotron text-center">
            <h3>Course</h3>
          </div>
        </div>

        <div className="row">
          {this.state.courseInfo.map((item, key) => {
            return (
              <div className="col-md-4 col-xs-12 col-sm-6" key={key}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> {item.title} </h3>
                  </div>
                  <div className="panel-body">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-responsive img-thumbnail"
                      style={{ width: "65%" }}
                    />
                    <hr />
                    <p className="text-info">
                      Fee <span className="pull-right"> {item.fee} </span>
                    </p>
                    <p className="text-info">
                      Duration
                      <span className="pull-right"> {item.duration} </span>
                    </p>
                  </div>
                  <div className="panel-footer">
                    <Link to={`/edit/${item.id}`} className="btn btn-info">
                      Edit
                    </Link>
                    <button
                      onClick={this.deleteHandler.bind(this, item.id)}
                      className="btn btn-danger pull-right"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
