import React from 'react';
import { Col } from 'react-bootstrap';
import createUtilityClassName from 'react-bootstrap/esm/createUtilityClasses';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card/';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return < div className='main-view' />;

  return filteredMovies.map(m => (
    <Col md={3} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  ));
}
export default connect(mapStateToProps)(MoviesList);