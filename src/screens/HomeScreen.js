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
} from '../actions/actions';
import Popup from '../components/Popup';

const HomeScreen = ({ history, match }) => {
  const { params } = match;
  let bookUrl = params.book || null;
  let chapterUrl = params.chapter || null;
  let verseUrl = params.verse || null;
  const dispatch = useDispatch();
  const [book, setBook] = useState(bookUrl);
  const [chapter, setChapter] = useState(chapterUrl);
  const [verse, setVerse] = useState(verseUrl);
  const setBooks = useSelector((state) => state.setBooks);
  const { finalVerse } = useSelector((state) => state.setReading);
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
    <Container className='mx-md-1 my-md-3'>
      <>
        <Col md='9' sm='12' xs={12} className='text-center'>
          <Row>
            <LinkContainer
              style={{ height: '36px', fontSize: '16px' }}
              className='mytop padding-small'
              disabled={verseSetVerse >= finalVerse}
              to={`/word/${bookSetVerse}/${chapterSetVerse}/${
                Number(verseSetVerse) - (verseSetVerse <= 1 ? 0 : 1)
              }`}
            >
              <span className='text-primary'>Previous</span>
            </LinkContainer>
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
            <LinkContainer
              style={{ height: '36px', fontSize: '16px' }}
              className='mytop padding-small'
              disabled={verseSetVerse >= finalVerse}
              to={`/word/${bookSetVerse}/${chapterSetVerse}/${
                Number(verseSetVerse) + (verseSetVerse >= finalVerse ? 0 : 1)
              }`}
            >
              <span className='text-primary'>Next</span>
            </LinkContainer>
          </Row>
          <Row>
            {loadingVerse ? (
              <Loader />
            ) : (
              <Container className='font-small'>
                {errorVerse ? (
                  <Popup show={true} books={errorVerse.books} history />
                ) : (
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
                )}
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
