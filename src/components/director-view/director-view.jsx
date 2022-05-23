import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './director-view.scss';



export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <>
        <Container className='view-container'>
          <Row id='movie-director'>

            <Card >
              <div>
                <Card.Header className='movie-title'>{director.name}</Card.Header>
                <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
              </div>
              <Card.Body >
                <div>
                  <label htmlFor='bio' className='label'>Bio: </label>
                  <Card.Text className='value'>{director.bio}</Card.Text>
                </div>
                <div>
                  <label htmlFor='birth' className='label'>Birth: </label>
                  <Card.Text className='value'>{director.birth}</Card.Text>
                </div>
              </Card.Body>
            </Card>

          </Row>
        </Container>
      </>
    )
  }
}