import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;
    {/*Add click event to call back function in MainView to change state */ }
    return <div className="movie-card" onClick={() => {
      onMovieClick(movie);
    }}  >{movie.title}</div>
  }
}

MovieCard.propTypes = {
  movie: PropTypes.exact({
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    runtime: PropTypes.number,
    plot: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.number,
    }).isRequired,
    actors: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};