import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Badge,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  setBooksAction,
  setVerseAction,
  setTextAction,
  getCategories,
} from '../actions/actions';

const HomeScreen = ({ match }) => {
  const { params } = match;
  let bookUrl = params.book || null;
  let chapterUrl = params.chapter || null;
  let verseUrl = params.verse || null;
  const dispatch = useDispatch();
  const [book, setBook] = useState(bookUrl);
  const [chapter, setChapter] = useState(chapterUrl);
  const [verse, setVerse] = useState(verseUrl);
  const setBooks = useSelector((state) => state.setBooks);
  const { books, loading } = setBooks;
  const { loading: loadingVerse, error: errorVerse, page } = useSelector(
    (state) => state.setReading
  );

  const {
    book: bookSetVerse,
    chapter: chapterSetVerse,
    verse: verseSetVerse,
  } = useSelector((state) => state.setVerse);
  useEffect(() => {
    if (bookUrl) {
      if (chapterUrl) {
        if (verseUrl) {
          dispatch(
            setVerseAction({
              book: bookUrl,
              chapter: chapterUrl,
              verse: verseUrl,
            })
          );
        } else {
          dispatch(
            setVerseAction({ book: bookUrl, chapter: chapterUrl, verse: 1 })
          );
        }
      } else {
        if (verseUrl) {
          dispatch(
            setVerseAction({ book: bookUrl, chapter: 1, verse: verseUrl })
          );
        } else {
          dispatch(setVerseAction({ book: bookUrl, chapter: 1, verse: 1 }));
        }
      }
    }
    if (!book) {
      setBook(bookSetVerse);
    }
    if (!chapter) {
      setChapter(chapterSetVerse);
    }
    if (!verse) {
      setVerse(verseSetVerse);
    }
    if (books.length < 1 && !loading) {
      dispatch(setBooksAction());
    }
    dispatch(
      setTextAction({
        book: bookSetVerse,
        chapter: chapterSetVerse,
        verse: verseSetVerse,
      })
    );
    dispatch(getCategories());
  }, [
    dispatch,
    bookSetVerse,
    chapterSetVerse,
    verseSetVerse,
    book,
    books,
    chapter,
    verse,
    loading,
    match,
    bookUrl,
    chapterUrl,
    verseUrl,
  ]);
  return (
    <Container className='mx-1 my-3'>
      <>
        <Col md='9' sm='9' className='text-center'>
          <Row>
            <Button
              variant='outline-primary'
              size='sm'
              type='button'
              style={{ height: '36px', fontSize: '16px' }}
              className='mytop padding-small'
            >
              Previous
            </Button>
            <Breadcrumb className='mytop padding-small mx-auto'>
              <LinkContainer to={`/word/${bookSetVerse}`}>
                <Breadcrumb.Item>{bookSetVerse}</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to={`/word/${bookSetVerse}/${chapterSetVerse}`}>
                <Breadcrumb.Item>{chapterSetVerse}</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer
                to={`/word/${bookSetVerse}/${chapterSetVerse}/${verseSetVerse}`}
              >
                <Breadcrumb.Item>{verseSetVerse}</Breadcrumb.Item>
              </LinkContainer>
            </Breadcrumb>
            <Button
              variant='outline-primary'
              size='sm'
              style={{ height: '36px', fontSize: '16px' }}
              className='mytop padding-small'
            >
              Next
            </Button>
          </Row>
          <Row>
            {loadingVerse ? (
              <Loader />
            ) : (
              <Container className='font-small'>
                {errorVerse && <Message message={errorVerse} />}
                <p>
                  {page.map((verse, index) => {
                    return (
                      <span key={index}>
                        <sup>
                          <Badge
                            variant='primary'
                            style={{ fontSize: '10px', margin: '2px' }}
                          >
                            {verse.verse}
                          </Badge>
                        </sup>
                        {verse.text}
                      </span>
                    );
                  })}
                </p>
              </Container>
            )}
          </Row>
        </Col>
        <Col md='3' className='mobile-hide'></Col>
      </>
    </Container>
  );
};

export default HomeScreen;
