import React, { useEffect } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader.js';
import { getCategories } from '../actions/actions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.setCategories
  );
  useEffect(() => {
    if (categories.length < 1 && !loading) {
      dispatch(getCategories());
    }
  });
  return (
    <Col className='mobile-hide my-3' md='3' sm='3' xs='1'>
      {loading && <Loader />}
      <ListGroup variant='flush'>
        {categories.map((category, key) => (
          <LinkContainer key={key} to={`/categories/${category.category}`}>
            <ListGroup.Item>{category.category}</ListGroup.Item>
          </LinkContainer>
        ))}
      </ListGroup>
    </Col>
  );
};

export default Sidebar;
