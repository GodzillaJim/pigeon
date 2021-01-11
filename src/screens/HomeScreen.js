import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setBooksAction } from '../actions/actions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const setBooks = useSelector((state) => state.setBooks);
  const { books, loading, error } = setBooks;
  const { book, loading: bookLoading, error: bookErrorLoading } = useSelector(
    (state) => state.setBook
  );
  useState(() => {
    dispatch(setBooksAction());
  }, [books, loading, error]);
  return (
    <Container className='my-3 w-100'>
      <Row>
        <Col className='text-left'>
          <>
            <LinkContainer to={`/book/${book.trim()}`}>
              <ListGroup variant='flush' className='books-panel p-2'>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {books.sort().map((book, key) => (
                  <ListGroup.Item key={key}>{book}</ListGroup.Item>
                ))}
              </ListGroup>
            </LinkContainer>
          </>
        </Col>
        <Col md='8'>Text</Col>
        <Col md='3'>Verses</Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
