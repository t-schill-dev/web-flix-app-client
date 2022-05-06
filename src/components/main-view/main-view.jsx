import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
      ],
      selectedMovie: null
    }
  }

  render() {
    const { movies } = this.state; // === to this.state.movies
    if (movies.length === 0) {
      return <div className='main-view'>The list is empty</div>
    } else {
      return (
        <div className="mainview">
          {movies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
        </div>
      );
    }
  };
}

