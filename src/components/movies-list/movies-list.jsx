import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';

function MoviesList(props) {
  const { movies, visibilityFilter, user } = props;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }
  if (!movies) return < div className='main-view' />;

  return (
    <>

      {filteredMovies.map(m => (
        <Col xxl={2} xl={3} md={4} sm={6} key={m._id} id='movie-card-main'>
          <MovieCard movie={m} user={user} />
        </Col>
      ))}

    </>
  );
}

const mapStateToProps = state => {
  const { visibilityFilter, movies, user } = state;
  return { visibilityFilter, movies, user };
};

export default connect(mapStateToProps)(MoviesList);