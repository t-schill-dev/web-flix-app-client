import React from 'react';
import { Container, Col, Row, Button, Carousel, Card } from 'react-bootstrap';
import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { genreName, onBackClick, movies } = this.props;
    console.log(genreName)
    return (
      <>
        <Container >
          <Row >
            <Card id='genre-view'>
              <Row className='view-header'>
                <Col md={10}>
                  {genreName}
                </Col>
                <Col md={1}>
                  <div >
                    <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
                  </div>
                </Col>
              </Row>
              <Card.Text className='text-muted subtitle'>More movies of the same genre:</Card.Text>
              <Carousel variant='dark' className='movie-carousel'>
                {movies.map((movie) => {
                  if (movie.genres.includes(genreName)) {
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