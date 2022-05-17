import React from 'react';
import axios from 'axios'; // promise-based HTTP client for ajax fetching
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view'
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Row, Col, Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import './main-view.scss';



export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({ user });
  }

  render() {
    const { movies, selectedMovie, user } = this.state; // === to this.state.movies

    //Login View is rendered when no user is logged in
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) {
      return <div className='main-view' />
    };
    return (
      //Container already applied in index.jsx. One row only because condition allows only one possibility to render

      <>
        <Row>
          <NavbarView />
        </Row>
        <div>
          {selectedMovie
            ? (
              <Row className='main-view justify-content-md-center'>
                <Col md={8} >
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              </Row>
            )
            : (
              <Row className='main-view justify-content-md-center'>
                {movies.map(movie => (
                  <Col md={3} sm={4} id='movie-card-main'>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                  </Col>
                ))}
              </Row>
            )
          }
        </div>
      </>
    )
  };
  // Fetching movie data
  componentDidMount() {
    axios.get('https://web-flix-movies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

MainView.propTypes = {
  selectedMovie: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string
  })
}