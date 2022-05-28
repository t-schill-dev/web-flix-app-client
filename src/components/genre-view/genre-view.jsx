import React from 'react';
import { Container, Row, Button, Carousel, Card } from 'react-bootstrap';
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
          <Row id='genre-view'>
            <Card >
              <div>
                <Card.Header className='genre-title'>{genreName}</Card.Header>
                <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
              </div>
              <Card.Text className='text-center'>More movies of the same genre:</Card.Text>
            </Card>
          </Row>


          <Carousel >
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
        </Container>
      </>
    )
  };

}