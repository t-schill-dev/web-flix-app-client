import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Carousel } from 'react-bootstrap';

export function FavoriteMovies({ favoriteMovies, removeFav, movies }) {


  const favoriteMoviesId = favoriteMovies.map(m => m._id)

  const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

  return (
    <>
      <Col>
        <Row>

          <Card className='bg-light'>
            <Card.Title className='text-dark' >Favorite Movies</Card.Title>
            <Carousel variant='dark' className='movie-carousel'>
              {favoriteMoviesList.length === 0 ? (
                <p>You have no favorite movies yet</p>
              ) : (
                favoriteMoviesList.map(movie => {
                  return (

                    <Carousel.Item key={movie._id} className='text-center' >
                      <img
                        id='mini-movie-card_img'
                        src={movie.imageUrl}
                        alt="movie poster"
                      />
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Subtitle variant='link' style={{ marginTop: 10 }}>{movie.title}</Card.Subtitle>
                      </Link>
                    </Carousel.Item>

                  )
                })
              )
              }
            </Carousel>
            <Button variant='outline-danger' onClick={() => removeFav(movies._id)}>Remove from Favorites</Button>
          </Card>
        </Row>
      </Col>
    </>
  )
}