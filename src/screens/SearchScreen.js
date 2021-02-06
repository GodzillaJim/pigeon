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
  Pagination,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { searchVerseAction } from '../actions/actions';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound.js';

const SearchScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const urlPage = match.params.page;
  const {
    results,
    loading,
    error,
    numOfPages,
    page: currentPage,
    keyword: qword,
  } = useSelector((state) => state.searchVerse);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (keyword && !loading && keyword !== qword) {
      dispatch(searchVerseAction(keyword, page));
    }
    if (keyword && urlPage && !loading && urlPage !== currentPage) {
      dispatch(searchVerseAction(keyword, urlPage));
    }
  }, [
    keyword,
    dispatch,
    currentPage,
    loading,
    page,
    qword,
    urlPage,
    results,
    numOfPages,
    error,
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVerseAction(query, page));
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
      {results.length < 1 && query !== '' ? (
        <NotFound />
      ) : (
        <Row className='bg-light m-2'>
          <Col md={12} sm={12}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Alert>{error}</Alert>
            ) : (
              <ListGroup variant='flush'>
                {results.map((result, key) => (
                  <ListGroup.Item key={key}>
                    <LinkContainer
                      to={`/word/${result.book}/${result.chapter}/${result.verse}`}
                    >
                      <Button variant='link' className='h5'>
                        {result.book +
                          '/' +
                          result.chapter +
                          '/' +
                          result.verse}
                      </Button>
                    </LinkContainer>
                    <p>
                      {result.text.length > 150
                        ? result.text.length
                        : result.text.slice(0, 150) + '...'}
                    </p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Pagination className='mx-auto'>
            {[...Array(numOfPages).keys()].map((p) => {
              if (Math.abs(Number(currentPage) - (Number(p) + 1)) < 4) {
                return (
                  <LinkContainer
                    key={p}
                    to={`/search/${qword}/${Number(p + 1)}`}
                  >
                    <Pagination.Item
                      active={Number(p) + 1 === Number(currentPage)}
                      key={p}
                      onClick={(e) => setPage(e.target.value)}
                    >
                      {Number(p) + 1}
                    </Pagination.Item>
                  </LinkContainer>
                );
              } else {
                return null;
              }
            })}
          </Pagination>
        </Row>
      )}
    </Container>
  );
};

export default SearchScreen;
