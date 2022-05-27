import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './profile-view.scss';

import { UserData } from './user-data';
import { UpdatedUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';

export function ProfileView(props) {

  const [userdata, setuserdata] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (user) => {
    axios.get(`https://web-flix-movies.herokuapp.com/users/${user}`)
      .then(axios.spread(newData => {
        setuserdata(newData.data);
        setUpdatedUser(newData.data);
        setFavoriteMovies(props.movies.filter(m => newData.data.favoriteMovies.includes(m._id)));
      }))
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getUserData(), []
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://web-flix-movies.herokuapp.com/users/${userdata.username}`, updatedUser)
      .then(response => {
        setuserdata(response.data);
        alert('Profile updated')
      })
      .catch(e => {
        console.log(e);
      })
  };
  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }

  const deleteProfile = () => {
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${userdata.username}`)
      .then(res => {
        alert("Your profile has been deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token')

        window.open('/', '_self')
      })
      .catch(e => {
        console.log(e);
      })
  }

  const removeFav = (id) => {
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${userdata.username}/movies/${id}}`)
      .then(() => {
        setFavoriteMovies(favoriteMovies.filter(movie => movie._id != id))
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Container className='view-container' fluid>
      <Row>
        <Col>
          <h4>Hi, {userdata.username}</h4>
        </Col>
      </Row>
      <Row className='justify-content-center profile-view' >

        <Button id='return-button' onClick={() => { onBackClick() }}>Back</Button>
        <Col>
          <UserData id='user-data' userdata={userdata} />
          <FavoriteMovies favoriteMovies={favoriteMovies} removeFav={removeFav} />
          {/*Form to update user data*/}
          <UpdatedUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
          <Button variant='danger' type='submit' onClick={deleteProfile}>Delete profile</Button>
        </Col>

      </Row >
    </Container >
  );
};

ProfileView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string,
  birthday: PropTypes.number
}