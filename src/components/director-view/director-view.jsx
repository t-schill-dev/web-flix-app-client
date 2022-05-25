import React from 'react';
import { Row, Button, Card } from 'react-bootstrap';
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
            <Card.Text className='value'>{director.bio}</Card.Text>
            <label htmlFor='birth' className='label'>Birth: </label>
            <Card.Text className='value'>{director.birth}</Card.Text>
          </Card.Body>
        </Card>
      </Row>


    )
  }
}