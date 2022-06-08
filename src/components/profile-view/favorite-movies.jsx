import React from 'react';
import { Link } from 'react-router-dom';
import { setFavorites, setUser } from '../../actions/actions';
import { connect } from 'react-redux';
import { Col, Row, Card, Button, Carousel } from 'react-bootstrap';

function FavoriteMovies({ favoriteMovies, removeFav, movies }) {


  console.log(favoriteMovies)

  const favoriteMoviesList = movies.filter(m => {
    return favoriteMovies.includes(m._id)
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

                    <Carousel.Item key={movie.id} className='text-center' >
                      <img
                        id='mini-movie-card_img'
                        src={movie.imageUrl}
                        alt="movie poster"
                      />
                      <Link to={`/movies/${movie.id}`}>
                        <h6 variant='link' style={{ marginTop: 10 }}>{movie.title}</h6>
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

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    user: state.user
  };
};

export default connect(mapStateToProps, {
  setFavorites, setUser
})(FavoriteMovies);