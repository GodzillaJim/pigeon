import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const style = {
    position: 'fixed',
    bottom: '0px',
    textAlign: 'center',
  };
  return (
    <Container className='mx-auto bg-light' style={style}>
      <Row>
        <Col className='mx-auto'>&copy;{new Date().getFullYear()}</Col>
      </Row>
    </Container>
  );
};

export default Footer;
