import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/users/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form UpdateUser_deleteClick');
        console.error(err);
      });
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/${id}`)
      .then((res) => {
        setUser({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateUser');
        console.log(err);
      });
  }, [id]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: user.name,
      price: user.price,
      description: user.description,
      user_type: user.user_type,
      in_stock: user.in_stock,
      image: user.image,
    };

    axios
      .put(`http://localhost:8082/api/users/${id}`, data)
      .then((res) => {
        navigate(`/`);
      })
      .catch((err) => {
        console.log('Error in UpdateUser!');
      });
  };

  return (
    <div className='UpdateUser'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Back to Lamp List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Lamp</h1>
            <p className='lead text-center'>Update Lamp's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
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
                  <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update User
            </button>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(id);
              }}
            >
              Delete User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;