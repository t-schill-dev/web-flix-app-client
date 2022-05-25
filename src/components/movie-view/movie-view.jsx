import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        <Container id='movie-container' >
          <Row>
            <NavbarView />
          </Row>
          <Row id='movie-view' className='justify-content-center' >
            <Card >
              <div>
                <Card.Header className='movie-title'>{movie.title}</Card.Header>
                <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
              </div>
              <Card.Img id='movie-poster' src={movie.imageUrl} alt='Movie poster'></Card.Img>
              <Card.Body >
                <div>
                  <label htmlFor='movie-year'>Year: </label>
                  <Card.Text className='movie-year'>{movie.year}</Card.Text>
                </div>
                <div>
                  <label htmlFor='runtime'>Runtime: </label>
                  <Card.Text className='movie-runtime'>{movie.runtime}</Card.Text>
                </div>
                <div>
                  <label htmlFor='director'>Director: </label>
                  <Card.Link className='movie-link' onClick={() => onClick(director)} href='#'>{movie.director.name}</Card.Link>
                </div>
                <div className='movie-details'>
                  <label htmlFor='actors'>Actors:</label>
                  <Link to={`/movies/${movie.actors.map((actor) => actor + ', ')}/actors`}>
                    <Button variant='link' className='movie-link'>{movie.actors.map((actor) => actor + ', ')}</Button>
                  </Link>
                </div>
                <div>
                  <label htmlFor='genres'>Genres: </label>
                  <Card.Link className='movie-link' onClick={() => onClick(genre)} href='#'>{movie.genres.map((genre) => genre + ', ')}</Card.Link>
                </div>
                <div>
                  <label>Plot: </label>
                  <Card.Text className='movie-plot'>{movie.plot}</Card.Text>
                </div>
              </Card.Body>
            </Card>

          </Row>


        </Container>

      </>
    );
  }
}

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired
}