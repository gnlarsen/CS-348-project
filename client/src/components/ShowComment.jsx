import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../App.css';

const ShowComment = ({comment}) => {
  const [username, setUsername] = useState("[account deleted]");

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/${comment.user_id}`)
      .then((res) => {
        if (res.data.name) {
            setUsername(res.data.name);
        }
        else {
            throw new Error(res);
        }
      })
      .catch((err) => {
        console.log('Error from ShowComment');
        console.error(err);
      });
  }, []);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/comments/${id}`)
      .then((res) => {
        console.log(comment.lamp_id);
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error from ShowLampDetails_deleteClick');
        console.error(err);
      });
  };

  return (
    <div className='comment-container'>
      <div className='desc'>
        <h4>
            {username} - {comment.timestamp}
        </h4>
            {comment.text}
      </div>
      <div className='col-md-4 m-auto'>
        <button
          type='button'
          className='btn btn-outline-danger btn-lg btn-block'
          onClick={() => {
            onDeleteClick(comment._id);
          }}
        >
          Delete Comment
        </button>
      </div>
      <div className='col-md-4 m-auto'>
        <Link
          to={`/edit-comment/${comment._id}`}
          className='btn btn-outline-info btn-lg btn-block'
        >
          Edit Comment
        </Link>
      </div>
      <br />
    </div>
  );
};

export default ShowComment;