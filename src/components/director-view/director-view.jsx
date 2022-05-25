import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './director-view.scss';



export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (


      <Row id='movie-director'>

        <Card >
          <div>
            <Card.Header className='movie-title'>{director.name}</Card.Header>
            <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
          </div>
          <Card.Body >
            <label htmlFor='bio' className='label'>Biography: </label>
            <p className='value'>{director.bio}</p>
            <label htmlFor='birth' className='label'>Birth: </label>
            <p className='value'>{director.birth}</p>
          </Card.Body>
        </Card>

      </Row>


    )
  }
}