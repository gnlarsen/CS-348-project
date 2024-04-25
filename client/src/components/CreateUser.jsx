import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = (props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const onSubmit = (e) => {
      console.log(user);
      e.preventDefault();
      axios
        .post("http://localhost:8082/api/users", user)
        .then((res) => {
          setUser({
            name: "",
            email: "",
            password: "",
          });
          // Push to /
          navigate("/");
        })
        .catch((err) => {
          console.log("Error in CreateUser!");
          console.log(err);
        });
    };



    return (
        <div className="CreateUser">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                  Back to Lamp List
                </Link>
              </div>
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">Add User</h1>
                <p className="lead text-center">Create new user</p>
                <form noValidate onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name of the User"
                      name="name"
                      className="form-control"
                      value={user.name}
                      onChange={onChange}
                    />
                  </div>

                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      value={user.email}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      value={user.password}
                      onChange={onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};

export default CreateAccount;