import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, Button, Carousel } from 'react-bootstrap';

function FavoriteMovies(props) {
  const { removeFav, movies, favorites } = props;

  const favoriteMoviesList = movies.filter(m => {
    return favorites.includes(m._id)
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
                        <h6 style={{ marginTop: 10 }}>{movie.title}</h6>
                      </Link>
                      <Button className='removeFav__button' variant='outline-danger' onClick={() => removeFav(movie._id)}>Remove from Favorites</Button>
                    </Carousel.Item>
                  )
                })
              )
              }
            </Carousel>
          </Card>
        </Row>
      </Col>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    user: state.user
  };
};

export default connect(mapStateToProps)(FavoriteMovies);