import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ShowLamp = ({lamp}) => {

  return (
    <div className='lamp-container'>
      <img
        src={lamp.image || 'https://i.pinimg.com/originals/7b/3f/cb/7b3fcbb3223ab62ac20daba144de76d7.png'} 
        alt='Lamp'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-lamp/${lamp._id}`}>{lamp.name}</Link>
        </h2>
      </div>
    </div>
  );
};

export default ShowLamp;