import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div id='movie-view'>

        <Row className='movie-header'>
          <Col id='movie-title' md={10}>
            {movie.title} ({movie.year})
          </Col>
          <Col md={1}>
            <div>
              <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
            </div>
          </Col>
        </Row>
        <Row className='view-box d-flex'>
          < Col xs={12} lg={4} id='image-wrapper'>
            <img id='movie-poster' src={movie.imageUrl} alt='Movie poster' />
          </Col >
          <Col className='movie-details d-flex' xs={12} lg={{ span: 8 }}>
            <div className='d-flex'>
              <span className='label' htmlFor='runtime'>Runtime:</span>
              <div className='movie-value'>
                <span>{movie.runtime} min</span>
              </div>
            </div>
            <div className='d-flex'>
              <span className='label' htmlFor='director'>Director:</span>
              <div className='movie-value'>
                <Link to={`/director/${movie.director.name}`}>
                  <Button id='movie-link' variant='link'>{movie.director.name}</Button>
                </Link>
              </div>
            </div>
            <div className='d-flex'>
              <span className='label' htmlFor='actors'>Actors:</span>
              <div className='movie-value'>
                {movie.actors.map((actor) => {
                  return (
                    <Link to={`/actors/${actor}`}>
                      <Button variant='link' id='movie-link'>{actor}</Button>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className='d-flex'>
              <span className='label' htmlFor='genres'>Genres:</span>
              <div className='movie-value'>
                {movie.genres.map((genre) => {
                  return (
                    <Link to={`/genres/${genre}`}>
                      <Button variant='link' id='movie-link'>{genre}</Button>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className='d-flex'>
              <span className='label' htmlFor='plot'>Plot:</span>
              <div className='movie-value'>
                <span>{movie.plot}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div >
    );
  }
}

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired
}
