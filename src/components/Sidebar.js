import React from 'react';
import {
  Col,
  Accordion,
  ListGroup,
  Alert,
  Card,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader.js';

const Sidebar = () => {
  const { loading, error, categories } = useSelector(
    (state) => state.setCategories
  );
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
