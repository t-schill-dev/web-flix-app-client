import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import './director-view.scss';



export function DirectorView(props) {

  const { director, onBackClick } = props;

  let birthDate = new Date(director.birth);
  let iso_date = birthDate.toLocaleDateString();

  return (

    <Row id='movie-director'>
      <Card >
        <Row className='view-header'>
          <Col id='movie-title' md={10}>
            {director.name}
          </Col>
          <Col md={1}>
            <div >
              <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
            </div>
          </Col>
        </Row>
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