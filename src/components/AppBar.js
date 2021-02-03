import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import {
  setBookAction,
  setChapterAction,
  setVerseAction,
} from '../actions/actions';

const NavbarComponent = ({ history }) => {
  const dispatch = useDispatch();
  const { books: allBooks } = useSelector((state) => state.setBooks);
  const [goIsDisabled, setGoDisabled] = useState(true);
  const [book, setBook] = useState('Genesis');
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [disableChapter, setDisableChapter] = useState(true);
  const [disableVerse, setDisableVerse] = useState(true);
  const { chapters: newChapters } = useSelector((state) => state.setBook);
  const { verses: newVerses } = useSelector((state) => state.setChapter);

  const styler = {
    navbar: {
      boxShadow: '0px 6px 5px 0px rgba(0,0,0,0.36)',
    },
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setVerseAction({ book, chapter, verse }));
    history.push(`/word/${book}/${chapter}/${verse}`);
  };
  const setBookHandler = (e, val) => {
    if (val) {
      let t = allBooks.indexOf(val);
      if (t !== -1) {
        setBook(val);
        setDisableChapter(false);
        dispatch(setBookAction(val));
        dispatch(setVerseAction({ book: val, chapter, verse }));
        setChapters(newChapters);
      } else {
        let error = new Error('Book not found!');
        alert(error.message);
        setDisableChapter(true);
      }
    }
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
  return (
    <Navbar
      sticky={'bottom'}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Book'
                    className='primary text-center'
                    variant='standard'
                    value={book}
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
                disabled={disableChapter}
                options={newChapters ? newChapters : []}
                onChange={setChapterHandler}
                getOptionLabel={(option) => option + ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={window.innerWidth < 350 ? 'Ch' : 'Chapter'}
                    variant='standard'
                    className='text-center'
                    value={chapter}
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
                options={newVerses ? newVerses : []}
                onChange={setVerseHandler}
                getOptionLabel={(option) => option + ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={window.innerWidth < 350 ? 'Vs' : 'Verse'}
                    variant='standard'
                    className='text-center'
                    value={verse}
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);
