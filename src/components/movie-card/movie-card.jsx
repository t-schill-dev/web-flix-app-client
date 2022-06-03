import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
//redux action
import { toggleFavorites } from '../../actions/actions'

//favorite asset images
import heartEmpty from '../../img/heart-empty.png';
import heartFull from '../../img/heart-full.png';
import './movie-card.scss';

export class MovieCard extends React.Component {
  constructor() {
    super();

  };

  user = this.props;

  addToFavoriteList(movieId) {

    axios.post(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response)
        alert(`The movie was successfully add to your list.`)
      }).
      catch(error => console.error(error))
  };

  removeFromFavoriteList(movieId) {

    axios.delete(`https://web-flix-movies.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response.data)
        alert(`The movie was successfully deleted from your list.`)
      }).
      catch(error => console.error(error))
  };

  favMovieClick(e) {
    e.preventDefault();
    const movId = this.props.movie._id;
    if (this.props.favorites.includes(movId)) {
      this.removeFromFavoriteList(movId);
    } else {
      this.addToFavoriteList(movId);
    }
    this.props.toggleFavorite(movId);
  }

  iconHandle(movieId) {
    if (this.props.favorites.includes(movieId)) {
      return heartFull;
    } else {
      return heartEmpty;
    }
  }

  render() {
    const { movie } = this.props;


    return (

      <Card id='movie-card'>
        <div className='poster-wrapper'>
          <Card.Img className='text-center  poster-img' variant='top' src={movie.imageUrl} />
        </div>
        <a
          href="#"
          onClick={(e) => this.favMovieClick(e)}
          data-toggle="tooltip"
          data-placement="top"
          title="Add to Favorites"
        >
          <img
            src={this.iconHandle(movie._id)}
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
  }
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, {
  toggleFavorites,
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