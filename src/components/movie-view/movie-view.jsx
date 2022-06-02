import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div id='movie-view'>

        <Row className='view-header'>
          <Col id='movie-title' md={10}>
            {movie.title} ({movie.year})
          </Col>
          <Col md={1}>
            <div className='justify-end'>
              <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
            </div>
          </Col>
        </Row>
        <Row className='view-box'>
          < Col xs={12} lg={4} id='image-wrapper'>
            <img id='movie-poster' src={movie.imageUrl} alt='Movie poster'></img>
          </Col >


          <Col xs={12} lg={{ span: 8 }}>
            <div className='movie-details'>
              <div>
                <span className='label' htmlFor='runtime'>Runtime: </span>
                <span className='view-value'>{movie.runtime}</span>
              </div>
              <div>
                <span className='label' htmlFor='director'>Director: </span>
                <Link to={`/director/${movie.director.name}`}>
                  <Button className='movie-link' variant='link'>{movie.director.name}</Button>
                </Link>
              </div>
              <div>
                <span className='label' htmlFor='actors'>Actors: </span>
                {movie.actors.map((actor) => {
                  return (
                    <Link to={`/actors/${actor}`}>
                      <Button variant='link' className='movie-link'>{actor}</Button>
                    </Link>
                  )
                })}
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
              <div>
                <span className='label' htmlFor='plot'>Plot: </span>
                <span className='view-value'>{movie.plot}</span>
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