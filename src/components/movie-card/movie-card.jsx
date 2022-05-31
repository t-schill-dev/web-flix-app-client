import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    {/*Add click event to call back function in MainView to change state */ }
    return (

      <Card id='movie-card'>
        <Card.Img fluid='true' className='text-center' variant='top' src={movie.imageUrl} />
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