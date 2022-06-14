import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import './profile-view.scss';
import { connect } from 'react-redux';
import { setUser, setFavorites, toggleFavorites, setUserData } from '../../actions/actions';

import { UserData } from './user-data';
import { UpdateUser } from './update-user';
import FavoriteMovies from './favorite-movies';


function ProfileView(props) {
  //Declaring states as props from redux store through connect()
  const { user, movies, favorites, userData } = props;

  //const [userdata, setUserdata] = useState({});
  //const [updatedUser, setUpdatedUser] = useState({});

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  //Fetching userdata and updating state
  const getUserData = (user) => {
    axios.get(`https://web-flix-movies.herokuapp.com/users/${user}`)
      .then(res => {
        setUserData(res.data);
        setFavorites(res.data.favoriteMovies);
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }
  // Load it once per rendering by adding []
  useEffect(() => {
    getUserData(user);

  }, [])

  const isUser = (user) => {
    axios.get('https://web-flix-movies.herokuapp.com/users')
      .then(res => {
        let allUsers = res.data.map(user => user.username);
        console.log(allUsers.includes(user))
        //return true if it matches the parameter
        return allUsers.includes(user)
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }
  // const handleUpdate = (e) => {
  //   setUpdatedUser({
  //     ...updatedUser,
  //     [e.target.name]: e.target.value
  //   });


  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      ...userData,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    console.log('new user: ', newUserData);

    const errors = validateData(newUserData);
    if (errors.length > 0) {
      alert('Errors: ', JSON.stringify(errors, null, 2))
      console.log('errors: ', errors);
    }
    else {
      axios.put(`https://web-flix-movies.herokuapp.com/users/${user}`, newUserData)
        .then((response) => {
          alert('Profile updated')
          // setUpdatedUser(response.data)
          setUserData(newUserData);
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  function validateData(userData) {
    const errors = [];
    if (userData.username === '') {
      errors.push('username cannot be empty');
    } else if (userData.password === '') {
      errors.push('Password is required');
    } else if (userData.email === '') {
      errors.push('Enter a valid email address');
    }
    return errors;
  }



  const deleteProfile = () => {
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${userData.username}`)
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
  //Function invoked by button in FavoriteMovies Component and updates state
  const removeFav = (id) => {
    axios.delete(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${id}`)
      .then(() => {
        setFavorites(favorites.filter(favId => favId != id));
        getUserData(user);
        props.toggleFavorites(id);
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <Row >
        <Col >
          <h2 className='page-header'>Hi, {userData.username}!</h2>
        </Col>
      </Row >
      <Row className='profile-view text-center' >
        <h4 className='card-title_profile'>Profile</h4>
        <Col md={5} xs={12}>
          <UserData userdata={userData} />
        </Col>
        <Col md={{ span: 7 }} xs={12}>
          <FavoriteMovies movies={movies} removeFav={removeFav} />
        </Col>

      </Row>
      <Row style={{ marginTop: 20 }}>
        {/*Form to update user data*/}
        <h4 className='card-title_profile'>Update Profile</h4>
        <Col>
          <UpdateUser userdata={userData} handleSubmit={handleSubmit} />
        </Col>
        <Button variant='danger' type='submit' onClick={deleteProfile}>Delete profile</Button>
      </Row >
    </>
  );
};
//Making states available as props in the component
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    user: state.user,
    userData: state.userData
  };
};
// dispatch action creators as props to child component
export default connect(mapStateToProps, {
  setFavorites, setUser, toggleFavorites, setUserData
})(ProfileView);
ProfileView.propTypes = {
  userdata: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string,
    birthday: PropTypes.number,
  })
}
