import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowLamp from "./ShowLamp.jsx";
import Select from "react-dropdown-select";
 
const ShowLampList = (props) => {
    const [lamps, setLamps] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [filter, setFilter] = useState({
      minPrice: "",
      maxPrice: "",
      lampType: "",
    });

    const [options, setOptions] = useState([]);

    axios
          .get(`http://localhost:8082/api/lamps/`)
          .then((res) => {
            if (res.data[0]) {
                console.log(res);
            }
            else {
                console.log(res);
                throw new Error("Lamps not found");
            }

          })
          .catch((err) => {
            console.error(err);
          });

    const navigate = useNavigate();

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.email === "" || user.password === "") {
            console.log('Error in ShowLampList. Enter a valid email and password');
            return;
        }
    
        axios
          .get(`http://localhost:8082/api/users/${user.email}/${user.password}`)
          .then((res) => {
            if (res.data[0]) {
                navigate(`/edit-user/${res.data[0]._id}`);
            }
            else {
                console.log(res);
                throw new Error("User not found");
            }

          })
          .catch((err) => {
            console.error(err);
          });
    };

    const onChangeFilter = (e) => {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const onSubmitFilter = (e) => {

    };

    useEffect(() => {
      axios
        .get('http://localhost:8082/api/lamps')
        .then((res) => {
          setLamps(res.data);
        })
        .catch((err) => {
          console.log('Error from ShowLampList');
        });
    }, []);
  
    const lampList =
      lamps.length === 0
        ? 'there is no lamp record!'
        : lamps.map((lamp, k) => <ShowLamp lamp={lamp} key={k} />);
  
    return (
      <div className='ShowLampList'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <h2 className='display-4 text-center'>Lamp List</h2>
            </div>
  
            <div className='col-md-11'>
              <Link
                to='/create-lamp'
                className='btn btn-outline-warning float-right'
              >
                + Add New Lamp
              </Link>
              <Link
                to='/create-user'
                className='btn btn-outline-warning float-right'
              >
                + Create New User
              </Link>
              <br />
              <br />
              <form noValidate onSubmit={onSubmit}>
              <button
                type='submit'
                className='btn btn-outline-warning float-right'
              >
                + Edit User
              </button>
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
              </form>
              <br />
              <hr />
            </div>

            <div>
              <form noValidate onSubmit={onSubmitFilter}>
              <div className="form-group">
                    <input
                      type="number"
                      placeholder="Price Minimum (default $0)"
                      name="minPrice"
                      className="form-control"
                      value={filter.minPrice}
                      onChange={onChangeFilter}
                    />
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      placeholder="Price Maximum (default $5000)"
                      name="maxPrice"
                      className="form-control"
                      value={filter.maxPrice}
                      onChange={onChangeFilter}
                    />
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      placeholder=""
                      name=""
                      className="form-control"
                      value={filter.minPrice}
                      onChange={onChangeFilter}
                    />
                </div>

              </form>
              <br />
              <hr />
            </div>
            
          </div>
  
          <div className='list'>{lampList}</div>
        </div>
      </div>
    );
  }

export default ShowLampList;