import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { setBookAction } from '../actions/actions';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const { books: allBooks } = useSelector((state) => state.setBooks);
  const [book, setBook] = useState('Genesis');
  const [chapters, setChapters] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [verse, setVerse] = useState(1);
  const [text, setText] = useState('Trww');
  const [disableChapter, setDisableChapter] = useState(true);
  const [disableVerse, setDisableVerse] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([
    'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
  ]);

  useEffect(() => {
    setBooks(allBooks);
  }, [allBooks]);

  const styler = {
    navbar: {
      boxShadow: '0px 6px 5px 0px rgba(0,0,0,0.36)',
    },
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setBookAction(book));
  };
  const setBookHandler = (e, val) => {
    let t = books.indexOf(val);
    if (t !== -1) {
      setBook(val);
      setError(null);
      setDisableChapter(false);
      dispatch(setBookAction(book));
    } else {
      let error = new Error('Book not found!');
      setError(error);
      setDisableChapter(true);
    }
  };
  const setChapterHandler = () => {};
  return (
    <Navbar
      bg='light'
      className='justify-content-between navbar-expand-*'
      style={styler.navbar}
    >
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse
        id='basic-navbar-nav'
        className='justify-content-between'
      >
        <Nav className={window.innerWidth > 768 ? 'mx-auto py-2' : 'mx-auto'}>
          <Form inline onSubmit={submitHandler}>
            <Form.Group id='book-form-group'>
              <Autocomplete
                className={`mx-2 w-7`}
                color='inherit'
                id='book'
                onChange={setBookHandler}
                options={books}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Book'
                    className='primary'
                    variant='standard'
                    value={book}
                    size={'small'}
                    className='text-center'
                  />
                )}
              />
            </Form.Group>
            <Form.Group id='chapter-form-group'>
              <Autocomplete
                className=' mx-2 w-45'
                color='inherit'
                id='chapter'
                disabled={disableChapter}
                options={chapters}
                onChange={(e, value) => setChapter(value)}
                getOptionLabel={(option) => option + ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={window.innerWidth < 350 ? 'Ch' : 'Chapter'}
                    variant='standard'
                    className='text-center'
                  />
                )}
              />
            </Form.Group>
            <Form.Group id='verse-form-group'>
              <Autocomplete
                className='w-45 mx-2'
                color='inherit'
                id='verse'
                disabled={disableVerse}
                options={verses}
                onChange={(e, value) => setVerse(value)}
                getOptionLabel={(option) => option + ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={window.innerWidth < 350 ? 'Vs' : 'Verse'}
                    variant='standard'
                    className='text-center'
                  />
                )}
              />
            </Form.Group>
            <Button type='submit' className='btn btn-primary'>
              Go
            </Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
