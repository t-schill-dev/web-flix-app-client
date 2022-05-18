import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Card, Button } from 'react-bootstrap';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;
    {/*Add click event to call back function in MainView to change state */ }
    return (

      <Card id='movie-card'>
        <Card.Img fluid='true' id='movie-card_img' className='text-center' variant='top' src={movie.imageUrl} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.plot}</Card.Text>
          <Button id='details-btn' onClick={() => onMovieClick(movie)} variant='link'>Details</Button>
        </Card.Body>
      </Card>

    )
  }
};

MovieCard.propTypes = {
  movie: PropTypes.exact({
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    runtime: PropTypes.number,
    plot: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.number,
    }).isRequired,
    actors: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};