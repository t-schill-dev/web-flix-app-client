import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import {Container} from 'react-bootstrap'
import './index.scss';

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

// create root element
const root = ReactDOM.createRoot(container);

//Render app in root DOM element
root.render(React.createElement(WebFlixApplication));
