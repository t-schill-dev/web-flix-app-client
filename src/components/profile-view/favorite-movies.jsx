import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button } from 'react-bootstrap';

export function FavoriteMovies({ favoriteMovies, removeFav }) {
  return (
    <>
      <Row>
        <Col>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMovies.map(movie => {
          return (
            <Col key={_id}>
              <Card id='movie-card'>
                <Card.Img fluid='true' id='movie-card_img' className='text-center' variant='top' src={movie.imageUrl} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Subtitle className='text-muted'>{movie.year}</Card.Subtitle>
                  <Button variant='outline-danger' onClick={() => removeFav(movie._id)}>Remove from Favorites</Button>
                  <Link to={`/movies/${movie._id}`}>
                    <Button id='details-btn' variant='link'>Details</Button>
                  </Link>

                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}