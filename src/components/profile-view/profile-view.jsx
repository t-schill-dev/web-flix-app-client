import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import './profile-view.scss';
//import redux modules
import { connect } from 'react-redux';
import { setUser, setFavorites } from '../../actions/actions';

import { UserData } from './user-data';
import { UpdateUser } from './update-user';
import FavoriteMovies from './favorite-movies';


function ProfileView(props) {

  const user = props.user;
  const movies = props.movies;

  const [userdata, setuserdata] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (user) => {
    axios.get(`https://web-flix-movies.herokuapp.com/users/${user}`)

      .then(res => {
        setuserdata(res.data);
        setFavoriteMovies(res.data.favoriteMovies);

        console.log(userdata);
      })
      .catch(err => {

        console.log(err);
      })
  }
  // Load it once per rendering by adding []
  useEffect(() => {
    getUserData(user);

  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://web-flix-movies.herokuapp.com/users/${userdata.username}`, userdata)
      .then(() => {
        alert('Profile updated')
        getUserData(user);
      })
      .catch(e => {
        console.log(e);
      })
  };
  const handleUpdate = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value
    });

  }

  const deleteProfile = () => {
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${userdata.username}`)
      .then(() => {
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
    console.log('movie id in function is' + id)
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${id}`)
      .then(() => {
        console.log('Movie has been deleted');
        setFavoriteMovies(favoriteMovies.filter(movie => movie._id != id));
        getUserData(user);
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <Row >
        <Col >
          <h2 className='page-header'>Hi, {userdata.username}!</h2>
        </Col>
      </Row >

      <Row className='profile-view text-center' >
        <h4 className='card-title_profile'>Profile</h4>
        <Col md={5} xs={12}>
          <UserData userdata={userdata} />
        </Col>
        <Col md={{ span: 7 }} xs={12}>
          <FavoriteMovies movies={movies} favoriteMovies={favoriteMovies} removeFav={removeFav} />
        </Col>

      </Row>
      <Row style={{ marginTop: 20 }}>
        {/*Form to update user data*/}
        <h4 className='card-title_profile'>Update Profile</h4>
        <Col>
          <UpdateUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        </Col>
        <Button variant='danger' type='submit' onClick={deleteProfile}>Delete profile</Button>


      </Row >
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    user: state.user
  };
};

export default connect(mapStateToProps, {
  setFavorites, setUser
})(ProfileView);
ProfileView.propTypes = {
  userdata: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string,
    birthday: PropTypes.number,
  })
}