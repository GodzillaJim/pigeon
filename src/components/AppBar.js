import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import Genesis from '../../backend/bible/Genesis.json';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, Row, Col } from 'react-bootstrap';

const NavbarComponent = () => {
  const [book, setBook] = useState('Genesis');
  const [chapters, setChapters] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [verse, setVerse] = useState(1)
  const [text, setText] = useState('')
  const [books, setBooks] = useState([
    'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
  ]);
  useEffect(() => {
      setBooks([...books, 'Mathew'])
      setBook('Genesis')
      setChapter(1)
      setVerse(1)
      setText(Genesis.chapters[chapter].verses[verse].text)
      setChapters([...Genesis.chapters.keys()])
      setVerses([...Genesis.chapters[chapter].keys()])
  }, [books, chapter, verse])
  return (
    <Navbar bg='light'>
      <Nav className='mx-auto'>
        <Row>
          <Col>
            <Autocomplete
              getOptionLabel={(option) => option}
              style={{ width: 'auto' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Book'
                  variant='standard'
                  required
                  value={book}
                />
              )}
              id='book'
              options={books}
            />
          </Col>
          <Col>
            <Autocomplete
              getOptionLabel={(option) => option}
              style={{ width: 'auto' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Chapter'
                  variant='standard'
                  type='number'
                  required
                  value={chapter}
                />
              )}
              id='book'
              options={chapters}
            />
          </Col>
          <Col>
            <Autocomplete
              getOptionLabel={(option) => option}
              style={{ width: 'auto' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Verse'
                  variant='standard'
                  type='number'
                  required
                  value={verse}
                />
              )}
              id='book'
              options={verses}
            />
          </Col>
        </Row>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
