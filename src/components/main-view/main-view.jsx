import React from 'react';
import axios from 'axios'; // promise-based HTTP client for ajax fetching
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view'
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col } from 'react-bootstrap';
import './main-view.scss';



export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  //Fetch data from database
  getMovies(token) {
    axios.get('https://web-flix-movies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  };
  // Fetching the access token from local storage
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  };

  render() {
    const { movies, user } = this.state;

    return (
      //Container already applied in index.jsx. One row only because condition allows only one possibility to render

      <Router>
        <Row>
          <NavbarView />
        </Row>

        <Row className='main-view justify-content-md-center'>

          {/*HomeRoute*/}
          <Route exact path='/' render={() => {
            //Login View is rendered when no user is logged in
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />;

            return movies.map(m => (
              <Col md={3} sm={4} key={m._id} id='movie-card-main'>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          {/*RegisterRoute*/}
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col lg={8} md={8}><RegistrationView /></Col>
          }} />

          {/*MovieRoute*/}
          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <MovieView movie={movies.find(movie => movie._id === match.params.movieId)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*DirectorRoute*/}
          <Route path='/director/:name' render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <DirectorView director={movies.find(m => m.director.name === match.params.name).director}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*GenresRoute*/}
          <Route path='/genres/:name' render={({ match, history }) => {
            // if (!user) return (
            //   <Col>
            //     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            //   </Col>
            // )
            // if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <GenreView movies={movies} genre={movies.filter((movie) => movie.genres.includes(match.params.name))}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*ProfileRoute*/}
          <Route path={`/users/${user}`} render={({ match, history }) => {

            if (!user) return <Redirect to='/' />
            return <Col md={8}>
              <ProfileView history={history} movies={movies} user={user === match.params.username}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*UserUpdateRoute*/}
          <Route path={'/user-update/${user}'}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <UserUpdate user={user === match.params.username}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
        </Row>
      </Router>

    )
  }
};


MainView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string
  })
};