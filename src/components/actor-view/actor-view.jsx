import React from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import './actor-view.scss';



export class ActorView extends React.Component {
  render() {
    const { actors, onBackClick } = this.props;
    return (

      <Row id='movie-actors'>
        <Col>
          <div>
            <h1 className='movie-title'>{actors}</h1>
            <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
          </div>
        </Col>
      </Row>


    )
  }
}
