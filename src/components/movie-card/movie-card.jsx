import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
//redux action
import { setFavorites, toggleFavorites } from '../../actions/actions'

//favorite asset images
import heartEmpty from '../../img/heart-empty.png';
import heartFull from '../../img/heart-full.png';
import './movie-card.scss';

function MovieCard(props) {
  //Declaring states as props from redux store through connect()
  const { user, movie, favorites } = props;
  const token = localStorage.getItem('token');

  const addToFavoriteList = (movieId) => {
    axios.post(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        //update state with new Info
        setFavorites(response.data.favoriteMovies)
        alert(`The movie was successfully added to your list.`)
      }).
      catch(error => console.error(error.response.data))
  };

  const removeFromFavoriteList = (movieId) => {

    axios.delete(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        //update state with new Info by creating new array where the prop isn't matching the existing state
        setFavorites(favorites.filter(favId => favId != movieId))
        alert(`The movie was successfully deleted from your list.`)
      }).
      catch(error => console.error(error))
  };
  //Handles click on heart icon Component
  const favMovieClick = (e) => {
    e.preventDefault();
    const movId = movie._id;
    if (favorites.includes(movId)) {
      removeFromFavoriteList(movId);
    } else {
      addToFavoriteList(movId);
    }
    //By calling reducer function the icon change and favorite state is handled
    props.toggleFavorites(movId);
  }
  //extra function to handle icon for event. 
  //Can not be implemented in favMovieClick because of return statements
  function iconHandle(movieId) {
    if (favorites.includes(movieId)) {
      return heartFull;
    } else {
      return heartEmpty;
    }
  }


  return (
    <Card id='movie-card'>
      <div className='poster-wrapper'>
        <Card.Img className='text-center  poster-img' variant='top' src={movie.imageUrl} />
      </div>
      <a
        href="#"
        onClick={(e) => favMovieClick(e)}
        data-toggle="tooltip"
        data-placement="top"
        title="Favorites"
      >
        <img
          src={iconHandle(movie._id)}
          id="fav-icon"
          alt="cam"
        />
      </a>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle className='text-muted'>{movie.year}</Card.Subtitle>
        <Card.Text>{movie.genres.map((genre) => genre + ' ')}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button id='details-btn' variant='link'>Details</Button>
        </Link>

      </Card.Body>
    </Card>

  )
};
//Making states available as props in the component
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    favorites: state.favorites,
    user: state.user
  };
};

export default connect(mapStateToProps, {
  toggleFavorites, setFavorites
})(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    runtime: PropTypes.number,
    plot: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    actors: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired
  }).isRequired
};