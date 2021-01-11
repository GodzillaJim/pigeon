import React, { useState } from 'react';
import { useSelector, ListGroup } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setBooksAction } from '../actions/actions';

const HomeScreen = () => {
  const { books, loading, error } = useSelector((state) => state.setBooks);
  const { book, loading: bookLoading, error: bookErrorLoading } = useSelector(
    (state) => state.setBook
  );
  useState(() => {
    dispatch(setBooksAction());
  }, [book]);
  return (
    <Container>
      <Row>
        <Col md='3'>
          <ListGroup>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {books.map((book, key) => {
              <ListGroup.Item key={key}>{book}</ListGroup.Item>;
            })}
          </ListGroup>
        </Col>
        <Col md='6'>Text</Col>
        <Col md='3'>Verses</Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
