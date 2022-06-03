import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
//redux action
import { toggleFavorite } from '../../actions/actions'

//favorite asset images
import heartEmpty from '../../img/heart-empty.png';
import heartFull from '../../img/heart-full.png';
import './movie-card.scss';

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: ''
    }
  }

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
    let movId = this.props.movie._id;
    if (this.props.favorites.includes(movId)) {
      this.removeFromFavoriteList(movId);
      return heartEmpty
    } else {
      this.addToFavoriteList(movId);
      return heartFull;
    }
    this.props.toggleFavorite(movId)
  }

  render() {
    const { movie, user } = this.props;


    return (

      <Card id='movie-card'>
        <Card.Img className='text-center' variant='top' src={movie.imageUrl} />
        <a
          href="#"
          onClick={(e) => this.favMovieClick(e)}
          data-toggle="tooltip"
          data-placement="top"
          title="Add to Favorites"
        >
          <img
            src={this.favMovieClick(movie._id)}
            className="fav-icon"
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