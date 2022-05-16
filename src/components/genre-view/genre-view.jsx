import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar, Carousel } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';


export class GenreView extends React.Component {

  render() {
    const { movie } = this.props;
    return (
      <>
        <Container>
          <Row>
            <NavbarView />
          </Row>
          <Row className='movie-genres'>
            <Col>
              <span className='selectedGenre'>{movie.genres.map((genre) => genre + ', ')}</span>

            </Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>

          </Row>
        </Container>

        <Carousel>
          <Carousel.Item interval={1000}>
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
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    )
  };

}