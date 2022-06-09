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

  const { user, movie, favorites } = props;
  const token = localStorage.getItem('token');

  const addToFavoriteList = (movieId) => {
    axios.post(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log('added' + response.data.favoriteMovies)
        setFavorites(response.data.favoriteMovies)
        alert(`The movie was successfully added to your list.`)
      }).
      catch(error => console.error(error))
  };

  const removeFromFavoriteList = (movieId) => {

    axios.delete(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {

        setFavorites(favorites.filter(favId => favId != movieId))
        alert(`The movie was successfully deleted from your list.`)
      }).
      catch(error => console.error(error))
  };

  const favMovieClick = (e) => {
    e.preventDefault();
    const movId = movie._id;
    if (favorites.includes(movId)) {
      removeFromFavoriteList(movId);
    } else {
      addToFavoriteList(movId);
    }
    props.toggleFavorites(movId);
  }

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
    _id: PropTypes.number.isRequired,
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