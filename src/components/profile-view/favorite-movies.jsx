import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Carousel, CarouselItem } from 'react-bootstrap';

export function FavoriteMovies({ favoriteMovies, removeFav, movies }) {


  const favoriteMoviesId = favoriteMovies.map(m => m._id)

  const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

  return (
    <>
      <Row>
        <Col>
          <h4 className='text-dark' style={{ padding: 10 }}>Favorite Movies</h4>
        </Col>
      </Row>
      <Row>

        <Card>
          <Carousel variant='dark' className='movie-carousel'>
            {favoriteMoviesList.length === 0 ? (
              <p>You have no favorite movies yet</p>
            ) : (
              favoriteMoviesList.map(movie => {
                return (
                  <Carousel.Item key={movie._id} className='text-center' >
                    <Card.Title className='text-dark'>{movie.title}</Card.Title>
                    <img
                      id='mini-movie-card_img'
                      src={movie.imageUrl}
                      alt="movie poster"
                    />
                  </Carousel.Item>
                )
              })
            )
            }
          </Carousel>
          <Button variant='outline-danger' onClick={() => removeFav(movies._id)}>Remove from Favorites</Button>
        </Card>


      </Row>
    </>
  )
}