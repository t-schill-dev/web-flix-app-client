import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

function MoviesList(props) {
  const { movies, visibilityFilter, favorites, user } = props;
  let filteredMovies = movies;


  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));

  }

  if (!movies) return < div className='main-view' />;

  return (
    <>

      {filteredMovies.map(m => (
        <Col xl={2} lg={3} sm={6} key={m._id} id='movie-card-main'>
          <MovieCard movie={m} user={user} favorites={favorites} />
        </Col>
      ))}

    </>
  );
}

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);