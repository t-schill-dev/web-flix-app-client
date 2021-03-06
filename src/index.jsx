import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { legacy_createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';
import './index.scss';

//Used createstore from redux instead using it from toolkit
const store = legacy_createStore(moviesApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//Main component
class WebFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//Finds the root of app
const container = document.getElementsByClassName('app-container')[0];
//Create root element
const root = createRoot(container);

//Render app in root DOM element
root.render(React.createElement(WebFlixApplication));