import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    {/*Add click event to call back function in MainView to change state */ }
    return (

      <Card id='movie-card'>
        <Card.Img fluid='true' id='movie-card_img' className='text-center' variant='top' src={movie.imageUrl} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Subtitle className='text-muted'>{movie.year}</Card.Subtitle>
          <Card.Text className='movie-plot'>{movie.plot}</Card.Text>
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
  }).isRequired
};