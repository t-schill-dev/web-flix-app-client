import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    {/*Add click event to call back function in MainView to change state */ }
    return <div className="movie-card" onClick={() => {
      onMovieClick(movie);
    }}  >{movie.Title}</div>
  }
}