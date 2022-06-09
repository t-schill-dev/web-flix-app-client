import React from 'react';
import axios from 'axios'; // promise-based HTTP client for ajax fetching
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setFavorites, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view'
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { ActorsView } from '../actors-view/actors-view';
import { Row, Col } from 'react-bootstrap';
import './main-view.scss';



class MainView extends React.Component {
  constructor() {
    super();

  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.props.setUser(authData.user.username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
    this.getFavorites(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
  }
  //Fetch data from database
  getMovies(token) {
    axios.get('https://web-flix-movies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  getFavorites(token) {

    let user = localStorage.getItem('user');
    axios.get(`https://web-flix-movies.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.props.setFavorites(response.data.favoriteMovies);
      })
      .catch((e) => console.log(e))
  }

  // Fetching the access token from local storage
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
      this.getFavorites(accessToken);
    }
  };


  render() {
    const { movies, user } = this.props;

    return (
      //Container already applied in index.jsx. One row only because condition allows only one possibility to render

      <Router>
        <Row>
          <NavbarView user={user} />
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

            return (

              <MoviesList />

            )
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
                onBackClick={() => history.goBack()} addToFavoriteList={this.addToFavoriteList} />
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
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <GenreView movies={movies} genreName={match.params.name}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*ActorsRoute showing actors associated with movies*/}
          <Route path='/actors/:name' render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <ActorsView movies={movies} actorName={match.params.name}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*ProfileRoute*/}
          <Route exact path={`/users/:user`} render={({ match, history }) => {

            if (!user) return <Redirect to='/' />
            return <Col md={8}>
              <ProfileView movies={movies} user={user}
              />
            </Col>
          }} />

        </Row>
      </Router>

    )
  };
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    favorites: state.favorites,
    user: state.user
  }
}
//connecting components to store
export default connect(mapStateToProps, {
  setMovies,
  setFavorites,
  setUser
})(MainView);

MainView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string
  })
};