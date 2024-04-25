import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLamp = (props) => {
    const navigate = useNavigate();

    const [lamp, setLamp] = useState({
      name: "",
      price: 0.0,
      description: "",
      lamp_type: "",
      in_stock: false,
      image: "",
    });
  
    const onChange = (e) => {
      setLamp({ ...lamp, [e.target.name]: e.target.value });
    };
  
    const onSubmit = (e) => {
      console.log(lamp);
      e.preventDefault();
      axios
        .post("http://localhost:8082/api/lamps", lamp)
        .then((res) => {
          setLamp({
            name: "",
            price: 0.0,
            description: "",
            lamp_type: "",
            in_stock: false,
            image: "",
          });
          // Push to /
          navigate("/");
        })
        .catch((err) => {
          console.log("Error in CreateLamp!");
        });
    };



    return (
        <div className="CreateLamp">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                  Show Lamp List
                </Link>
              </div>
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">Add Lamp</h1>
                <p className="lead text-center">Create new lamp</p>
                <form noValidate onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name of the Lamp"
                      name="name"
                      className="form-control"
                      value={lamp.name}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Price"
                      name="price"
                      className="form-control"
                      value={lamp.price}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      className="form-control"
                      value={lamp.description}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Type of lamp (Floor, Desk, Table, etc.)"
                      name="lamp_type"
                      className="form-control"
                      value={lamp.lamp_type}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="boolean"
                      placeholder="In stock?"
                      name="in_stock"
                      className="form-control"
                      value={lamp.in_stock}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Primary image url"
                      name="image"
                      className="form-control"
                      value={lamp.image}
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

export default CreateLamp;