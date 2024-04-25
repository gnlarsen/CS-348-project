import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShowComment from "./ShowComment.jsx";

const ShowLampDetails = (props) => {
    const [lamp, setLamp] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8082/api/lamps/${id}`)
        .then((res) => {
          setLamp(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log('Error from ShowLampDetails');
          console.error(err);
        });
    }, [id]);

    useEffect(() => {
      axios
        .get(`http://localhost:8082/api/comments/lamp/${id}`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          console.log('Error from ShowLampDetails in retrieving comments');
          console.error(err);
        });
    }, [id]);
  
    const onDeleteClick = (id) => {
      axios
        .delete(`http://localhost:8082/api/lamps/${id}`)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => {
          console.log('Error form ShowLampDetails_deleteClick');
        });
    };


    const commentList = 
      comments.length === 0
        ? 'No comments'
        : comments.map((comment, k) => <ShowComment comment={comment} key={k} />);
  
    const LampItem = (
      <div>
        <img
        src={lamp.image || 'https://i.pinimg.com/originals/7b/3f/cb/7b3fcbb3223ab62ac20daba144de76d7.png'} 
        alt='Lamp'
        height={200}
        />
        <br />
        <br />
        <table className='table table-hover table-dark'>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>Name</td>
              <td>{lamp.name}</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>Price</td>
              <td>${lamp.price ? lamp.price.$numberDecimal : "null"}</td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>Lamp type</td>
              <td>{lamp.lamp_type}</td>
            </tr>
            <tr>
              <th scope='row'>4</th>
              <td>In stock</td>
              <td>{(lamp.in_stock) ? "true" : "false"}</td>
            </tr>
            <tr>
              <th scope='row'>5</th>
              <td>Description</td>
              <td>{lamp.description}</td>
            </tr>
          </tbody>
        </table>
        <div className='list'>{commentList}</div>
      </div>
    );


    return (
    <div className='ShowLampDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Lamp List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Lamp's Record</h1>
            <p className='lead text-center'>View Lamp's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{LampItem}</div>
          <div className='col-md-4 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(lamp._id);
              }}
            >
              Delete Lamp
            </button>
          </div>
          <div className='col-md-4 m-auto'>
            <Link
              to={`/create-comment/${lamp._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Create Comment
            </Link>
          </div>
          <div className='col-md-4 m-auto'>
            <Link
              to={`/edit-lamp/${lamp._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Lamp
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ShowLampDetails;