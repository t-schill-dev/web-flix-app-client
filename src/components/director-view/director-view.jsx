import React from 'react';
import { Row, Button, Card } from 'react-bootstrap';
import './director-view.scss';



export function DirectorView(props) {

  const { director, onBackClick } = props;

  let birthDate = new Date(director.birth);
  let iso_date = birthDate.toLocaleDateString();

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
          <Card.Text className='value'>{iso_date}</Card.Text>
        </Card.Body>
      </Card>
    </Row>


  )
}