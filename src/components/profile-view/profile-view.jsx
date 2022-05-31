import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './profile-view.scss';

import { UserData } from './user-data';
import { UpdatedUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';

export function ProfileView(props) {

  const user = props.user;
  const movies = props.movies;

  const [userdata, setuserdata] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (user) => {
    axios.get(`https://web-flix-movies.herokuapp.com/users/${user}`)

      .then(res => {
        setuserdata(res.data);
        setUpdatedUser(res.data);
        setFavoriteMovies(res.data.favoriteMovies);
      })
      .catch(err => {

        console.log(err);
      })
  }
  // Load it once per rendering by adding []
  useEffect(() => {
    getUserData(user)
  }, [])


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
          <h4 className='text-dark'>Hi, {userdata.username}</h4>
        </Col>
      </Row>
      <Row className='justify-content-center profile-view' >


        <Col>
          <UserData id='user-data' userdata={userdata} />
          <FavoriteMovies movies={movies} favoriteMovies={favoriteMovies} removeFav={removeFav} />
          {/*Form to update user data*/}
          <UpdatedUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
          <Button variant='danger' type='submit' onClick={deleteProfile}>Delete profile</Button>
        </Col>

      </Row >
    </Container >
  );
};

ProfileView.propTypes = {
  userdata: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string,
    birthday: PropTypes.number,
  })
}