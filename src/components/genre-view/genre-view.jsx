import React from 'react';
import { Container, Row, Button, Carousel, Card } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import { FavoriteMovies } from '../profile-view/favorite-movies';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genreName, genre, onBackClick } = this.props;
    console.log(genre);
    console.log(genreName)

    return (
      <>
        <Container id='genre-view'>
          <Row>
            <Card >
              <div>
                <Card.Header className='genre-title'>{genreName}</Card.Header>
                <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
              </div>
            </Card>
          </Row>
        </Container>

        <Carousel>
          {genre.map((movie) => {

            return (
              <Carousel.Item key={movie._id}>
                <img
                  className="d-block w-100"
                  src="holder.js/800x400?text=First slide&bg=373940"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>

            )
          }
          )};

        </Carousel>
      </>
    )
  };

}