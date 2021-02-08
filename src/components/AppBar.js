import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import {
  setBookAction,
  setChapterAction,
  setVerseAction,
  searchVerseAction,
  setTextAction,
} from '../actions/actions';

const NavbarComponent = ({ history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { books: allBooks } = useSelector((state) => state.setBooks);
  const [goIsDisabled, setGoDisabled] = useState(true);
  const [book, setBook] = useState('Genesis');
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [disableChapter, setDisableChapter] = useState(true);
  const [disableVerse, setDisableVerse] = useState(true);
  const [query, setQuery] = useState('');
  const { chapters: newChapters } = useSelector((state) => state.setBook);
  const { verses: newVerses } = useSelector((state) => state.setChapter);
  const {
    book: bookSetVerse,
    chapter: chapterSetVerse,
    verse: verseSetVerse,
  } = useSelector((state) => state.setVerse);
  useEffect(() => {}, [bookSetVerse, chapterSetVerse, verseSetVerse]);

  const styler = {
    navbar: {
      boxShadow: '0px 6px 5px 0px rgba(0,0,0,0.36)',
      width: '100%',
    },
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setVerseAction({ book, chapter, verse }));
    history.push(`/word/${book}/${chapter}/${verse}`);
  };
  const setBookHandler = (e, val) => {
    setBook(val);
    setDisableChapter(false);
    dispatch(setBookAction(val));
    dispatch(setVerseAction({ book: val, chapter, verse }));
    dispatch(setTextAction({ book: val, chapter, verse }));
    setChapters(newChapters);
  };
  const setChapterHandler = (e, val) => {
    e = null;
    if (val) {
      if (Number(val) <= chapters.length || Number(val) > 0) {
        setDisableVerse(false);
        setChapter(val);
        dispatch(setChapterAction({ book, chapter }));
        dispatch(setVerseAction({ book, chapter: val, verse }));
      } else {
        let error = new Error('Chapter not found!');
        alert(error.message);
        setDisableVerse(true);
      }
    }
  };
  const setVerseHandler = (e, val) => {
    setVerse(val);
    if (val) {
      if (Number(val) <= newVerses.length || Number(val) > 0) {
        setVerse(val);
        dispatch(setVerseAction({ book, chapter, verse: val }));
        setGoDisabled(false);
      } else {
        let error = new Error('Chapter not found!');
        alert(error);
        setDisableVerse(true);
        setGoDisabled(true);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVerseAction(query));
    if (location.pathname !== '/search') {
      history.push('/search');
    }
  };
  return (
    <Navbar
      sticky={window.innerWidth > 768 ? 'top' : 'bottom'}
      bg='light'
      className='justify-content-between navbar-expand-*'
      style={styler.navbar}
    >
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse
        id='basic-navbar-nav'
        className='justify-content-between'
      >
        <Nav className={'mx-md-auto py-md-2'}>
          <Form inline onSubmit={submitHandler}>
            <Form.Group id='book-form-group'>
              <Autocomplete
                className={`mx-2 w-7`}
                color='inherit'
                id='book'
                onChange={setBookHandler}
                options={allBooks || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                getOptionLabel={(option) => option}
                value={bookSetVerse}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Book'
                    className='primary text-center'
                    variant='standard'
                    size={'small'}
                  />
                )}
              />
            </Form.Group>
            <Form.Group id='chapter-form-group'>
              <Autocomplete
                className=' mx-2 w-45'
                color='inherit'
                id='chapter'
                value={chapterSetVerse}
                disabled={disableChapter}
                options={newChapters ? newChapters : []}
                onChange={setChapterHandler}
                getOptionLabel={(option) => option + ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={window.innerWidth < 500 ? 'Ch' : 'Chapter'}
                    variant='standard'
                    className='text-center'
                    value={chapterSetVerse}
                  />
                )}
              />
            </Form.Group>
            <Form.Group id='verse-form-group'>
              <Autocomplete
                value={verseSetVerse}
                className='w-45 mx-2'
                color='inherit'
                id='verse'
                disabled={disableVerse}
                options={newVerses ? newVerses : []}
                onChange={setVerseHandler}
                getOptionLabel={(option) => option + ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={window.innerWidth < 500 ? 'Vs' : 'Verse'}
                    variant='standard'
                    className='text-center'
                    value={verseSetVerse}
                  />
                )}
              />
            </Form.Group>
            <Button
              type='submit'
              className='btn btn-primary'
              disabled={goIsDisabled}
            >
              Go
            </Button>
          </Form>
        </Nav>
        {window.innerWidth < 768 ? (
          <LinkContainer to='/search'>
            <i className='fas fa-search text-primary'></i>
          </LinkContainer>
        ) : (
          <Form inline onSubmit={handleSubmit}>
            <Form.Control
              type='text'
              placeholder='Search'
              className='mr-sm-2'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <Button type='submit'>
              <i className='fas fa-search'></i>
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);
