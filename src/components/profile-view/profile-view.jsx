import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import './profile-view.scss';

import { UserData } from './user-data';
import { UpdatedUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';

export function ProfileView(props) {

  const [userData, setUserData] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMovieList, setFavoriteMovieList] = useState({});

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (cancelToken, username) => {
    axios.get(`https://web-flix-movies.herokuapp.com/users/${username}`, { cancelToken: cancelToken })
      .then(res => {
        setUserData(res.data);
        setUpdatedUser(res.data);
        setFavoriteMovieList(props.movies.filter(m => res.data.FavoriteMovies.includes(m._id)));
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    let source = axios.CancelToken.source();

    if (token !== null) {
      getUserData(source.token, props.user);
    } else {
      console.log('Not authorized')
    }
    return () => {
      source.cancel();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://web-flix-movies.herokuapp.com/users/${userData.username}`, updatedUser)
      .then(response => {
        setUserData(response.data);
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
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${userData.username}`)
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
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${userData.username}/movies/${id}}`)
      .then(() => {
        setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id != id))
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Container className='view-container' fluid>

      <Row className='justify-content-center registration-view' >
        <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
        <Col>
          <UserData userData={userData} />
          <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />
          {/*Form to update user data*/}
          <UpdatedUser userData={userData} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
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