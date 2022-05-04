import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

//Main component
class WebFlixApplication extends React.Component {
  render() {
    return (
      <div className='web-flix'>
        <div>Good morning</div>
      </div>
    );
  }
}

//Finds the root of app
const container = document.getElementsByClassName('app-containter')[0];

//Render app in toot DOM element
ReactDOM.render(React.createElement(WebFlixApplication), container);