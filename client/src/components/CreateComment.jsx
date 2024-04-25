import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

const CreateComment = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [comment, setComment] = useState({
      user_id: "",
      lamp_id: id,
      text: "",
      timestamp: "",
    });

    const onChangeU = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const onChangeC = (e) => {
      setComment({ ...comment, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (comment.user_id !== "") {
            console.log(comment);
            axios
            .post(`http://localhost:8082/api/comments/`, comment)
            .then((res) => {
              setComment({
                user_id: "",
                lamp_id: id,
                text: "",
                timestamp: "",
              });
              setUser({
                  email: "",
                  password: "",
              })
              // Push to /
              navigate(`/show-lamp/${id}`);
          })
            .catch((err) => {
              console.log("Error in CreateComment!");
              console.error(err);
            });
        }
    })
  
    const onSubmit = (e) => {
      e.preventDefault();
      axios
      .get(`http://localhost:8082/api/users/${user.email}/${user.password}`)
      .then((res) => {
        if (res.data[0]) {
            setComment({ ...comment, "user_id" : res.data[0]._id, "timestamp" : Date.now()});
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

    return (
        <div className="CreateComment">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to={`/show-lamp/${id}`} className="btn btn-outline-warning float-left">
                  Back to lamp
                </Link>
              </div>
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">Add Comment</h1>
                <p className="lead text-center">Create new comment</p>
                <form noValidate onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      value={user.email}
                      onChange={onChangeU}
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
                      onChange={onChangeU}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your comment"
                      name="text"
                      className="form-control"
                      value={comment.text}
                      onChange={onChangeC}
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

export default CreateComment;