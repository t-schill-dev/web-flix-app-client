import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container'
import './index.scss';
import { Navbar } from 'react-bootstrap';

//Main component
class WebFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <MainView />
      </Container>
    );
  }
}

//Finds the root of app
const container = document.getElementsByClassName('app-container')[0];

//Render app in root DOM element
ReactDOM.render(React.createElement(WebFlixApplication), container);