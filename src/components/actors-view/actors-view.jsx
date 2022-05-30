import React from 'react';
import { Container, Row, Button, Carousel, Card } from 'react-bootstrap';
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
              <div>
                <Card.Header className='card-title'>{actorName}</Card.Header>

                <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
              </div>
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