import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Alert,
} from 'react-bootstrap';
import { ListContainer } from 'react-router-bootstrap';
import { searchVerseAction } from '../actions/actions';
import Loader from '../components/Loader';

const SearchScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const { results, loading, error } = useSelector((state) => state.searchVerse);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (keyword) {
      dispatch(searchVerseAction(keyword));
    }
  }, [keyword, dispatch, results, loading, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVerseAction(query));
  };

  return (
    <Container className='my-3'>
      {window.innerWidth < 768 && (
        <Row className='bg-light m-2'>
          <Form inline className='m-auto' onSubmit={handleSubmit}>
            <Form.Group className='mx-2 my-auto'>
              <Form.Control
                type='text'
                size={window.innerWidth < 768 ? 'sm' : 'lg'}
                name='search'
                id='keyword'
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </Form.Group>
            <Form.Group className='my-auto'>
              <Button
                type='submit'
                size={window.innerWidth < 768 ? 'sm' : 'lg'}
              >
                <i className='fas fa-search'></i>
              </Button>
            </Form.Group>
          </Form>
        </Row>
      )}
      <Row className='bg-light m-2'>
        <Col md={12} sm={12}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert>{error}</Alert>
          ) : (
            <ListGroup variant='flush'>
              {results.map((result, key) => (
                <ListGroup.Item key={key}>{result}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchScreen;
