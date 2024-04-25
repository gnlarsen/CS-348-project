import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateComment = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    _id: id,
    user_id: "",
    lamp_id: "",
    text: "",
    timestamp: "",
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



  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/comments/${id}`)
      .then((res) => {
        setComment({
          _id: res.data._id,
          user_id: res.data.user_id,
          lamp_id: res.data.lamp_id,
          text: res.data.text,
          timestamp: res.data.timestamp,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateComment');
        console.log(err);
      });
  }, [id]);

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setComment({...comment, "timestamp" : Date.now()});
    setComment({...comment, "timestamp" : Date.now()});

    axios
      .put(`http://localhost:8082/api/comments/${id}`, comment)
      .then((res) => {
        navigate(`/show-lamp/${comment.lamp_id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateComment!');
        console.error(err);
      });
  };

  return (
    <div className='UpdateComment'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to={`/show-lamp/${comment.lamp_id}`} className='btn btn-outline-warning float-left'>
              Back to Lamp
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Comment</h1>
            <p className='lead text-center'>Update Comment's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Text"
                      name="text"
                      className="form-control"
                      value={comment.text}
                      onChange={onChange}
                    />
                  </div>
                  <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateComment;