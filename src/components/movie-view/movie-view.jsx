import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>

        <Card id='movie-view' className='justify-content-center'>
          <div className='movie-header'>
            <Card.Header className='movie-title'>{movie.title} ({movie.year})</Card.Header>
            <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
          </div>
          <div id='image-wrapper'>

          </div>
          <Card.Body >
            <Card.Img id='movie-poster' src={movie.imageUrl} alt='Movie poster'></Card.Img>
            <div>
              <span className='label' htmlFor='runtime'>Runtime: </span>
              <span className='movie-details'>{movie.runtime}</span>
            </div>
            <div>
              <span className='label' htmlFor='director'>Director: </span>
              <Link to={`/director/${movie.director.name}`}>
                <Button className='movie-link' variant='link'>{movie.director.name}</Button>
              </Link>
            </div>
            <div>
              <span className='label' htmlFor='actors'>Actors: </span>
              <span variant='link' className='movie-details'>{movie.actors.map((actor) => actor + ', ')}</span>
            </div>
            <div>
              <span className='label' htmlFor='genres'>Genres:</span>

              {movie.genres.map((genre) => {
                return (
                  <Link to={`/genres/${genre}`}>
                    <Button variant='link' className='movie-link'>{genre}</Button>
                  </Link>
                )
              })}

            </div>
            <Card.Text>
              <span className='label' htmlFor='plot'>Plot: </span>
              <span className='movie-details'>{movie.plot}</span>
            </Card.Text>
          </Card.Body>
        </Card>

      </>
    );
  }
}

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired
}