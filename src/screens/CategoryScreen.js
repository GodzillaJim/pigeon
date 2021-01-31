import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getCategories } from '../actions/actions';
const CategoryScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { category } = match.params;
  const { categories, loading } = useSelector((state) => state.setCategories);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (categories.length < 1 && !loading) {
      dispatch(getCategories());
    }
    if (categories && category) {
      const books = categories.find((cat) => cat.category === category);
      if (books) {
        setBooks(books.books);
      }
    }
  }, [categories, category, loading, dispatch]);
  return (
    <Col md='9' sm='12' className='text-center my-3'>
      <p>
        {books &&
          books.map((book, key) => (
            <LinkContainer key={key} to={`/word/${book}`}>
              <Button variant='outline'>
                {book + (key === Number(books.length - 1) ? '.' : ', ')}
              </Button>
            </LinkContainer>
          ))}
      </p>
    </Col>
  );
};

export default CategoryScreen;
