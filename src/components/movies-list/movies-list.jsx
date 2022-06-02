import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityInputFilter from '../visibility-filter-input/visibility-filter-input';

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

  return (
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityInputFilter visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map(m => (
        <Col md={3} key={m._id} id='movie-card-main'>
          <MovieCard movie={m} />
        </Col>
      ))}

    </>
  );
}
export default connect(mapStateToProps)(MoviesList);