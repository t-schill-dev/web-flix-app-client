import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movie.imageUrl} alt='Movie poster' />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movie.title}</span>
        </div>
        <div className='movie-year'>
          <span className='label'>Year: </span>
          <span className='value'>{movie.year}</span>
        </div>
        <div className='movie-runtime'>
          <span className='label'>Runtime: </span>
          <span className='value'>{movie.runtime}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Plot: </span>
          <span className='value'>{movie.plot}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span className='value'>{movie.director.name}</span>
          <span className='value'>{movie.director.bio}</span>
          <span className='value'>{movie.director.birth}</span>
        </div>
        <div className='movie-actors'>
          <span className='label'>Actors: </span>
          <span className='value'>{movie.actors.map((actor) => actor + ', ')}</span>
        </div>
        <div className='movie-genres'>
          <span className='label'>Genres: </span>
          <span className='value'>{movie.genres.map((genre) => genre + ', ')}</span>
        </div>

        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired
}