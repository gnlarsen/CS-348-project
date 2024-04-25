import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateLamp = (props) => {
    const [lamp, setLamp] = useState({
      name: "",
      price: 0.0,
      description: "",
      lamp_type: "",
      in_stock: false,
      image: "",
    });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/lamps/${id}`)
      .then((res) => {
        setLamp({
          name: res.data.name,
          price: res.data.price ? res.data.price.$numberDecimal : 0,
          description: res.data.description,
          lamp_type: res.data.lamp_type,
          in_stock: res.data.in_stock,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateLamp');
        console.log(err);
      });
  }, [id]);

  const onChange = (e) => {
    setLamp({ ...lamp, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: lamp.name,
      price: lamp.price,
      description: lamp.description,
      lamp_type: lamp.lamp_type,
      in_stock: lamp.in_stock,
      image: lamp.image,
    };

    axios
      .put(`http://localhost:8082/api/lamps/${id}`, data)
      .then((res) => {
        navigate(`/show-lamp/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateLamp!');
      });
  };

  return (
    <div className='UpdateLamp'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to={`/show-lamp/${id}`} className='btn btn-outline-warning float-left'>
              Back to Lamp
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
                  <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Lamp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLamp;