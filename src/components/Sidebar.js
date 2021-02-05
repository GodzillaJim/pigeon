import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, ListGroup, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader.js';
import { getCategories } from '../actions/actions';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.setCategories
  );
  const { book } = useSelector((state) => state.setVerse);
  useEffect(() => {
    if (categories.length < 1 && !loading) {
      dispatch(getCategories());
    }
  }, [book, dispatch, categories, loading]);
  return (
    <Col className='mobile-hide my-3' md='3' sm='3' xs='1'>
      {loading && <Loader />}
      {error ? (
        <Alert>{error}</Alert>
      ) : (
        <ListGroup variant='flush'>
          {categories.map((category, key) => (
            <LinkContainer key={key} to={`/categories/${category.category}`}>
              <ListGroup.Item
                active={location.pathname
                  .toString()
                  .includes(category.category)}
              >
                {category.category}
              </ListGroup.Item>
            </LinkContainer>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default Sidebar;
