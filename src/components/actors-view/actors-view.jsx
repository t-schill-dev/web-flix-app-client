import React from 'react';
import { Container, Col, Row, Button, Carousel, Card } from 'react-bootstrap';
import './actors-view.scss';


export class ActorsView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { actorName, onBackClick, movies } = this.props;
    return (
      <>
        <Container >
          <Row >
            <Card id='actor-view'>
              <Row className='view-header'>
                <Col md={10}>
                  {actorName}
                </Col>
                <Col md={1}>
                  <div >
                    <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
                  </div>
                </Col>
              </Row>
              <Card.Text className='text-muted subtitle'>More movies of that actor:</Card.Text>
              <Carousel variant='dark' className='movie-carousel'>
                {movies.map((movie) => {
                  if (movie.actors.includes(actorName)) {
                    return (
                      <Carousel.Item key={movie._id} className='text-center' >
                        <img
                          id='mini-movie-card_img'
                          src={movie.imageUrl}
                          alt="movie poster"
                        />
                      </Carousel.Item>
                    )
                  }
                }
                )}
              </Carousel>
            </Card>
          </Row>



        </Container>
      </>
    )
  };

}