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
import {
  setBooksAction,
  setVerseAction,
  setTextAction,
  setBookAction,
  setChapterAction,
} from '../actions/actions';
import Popup from '../components/Popup';

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
  const { finalVerse } = useSelector((state) => state.setReading);
  const { books, loading } = setBooks;
  const { loading: loadingVerse, error: errorVerse, page } = useSelector(
    (state) => state.setReading
  );
  const { chapters: newChapters, loading: bookLoading } = useSelector(
    (state) => state.setBook
  );
  const { verses: newVerses, loading: verseLoading } = useSelector(
    (state) => state.setChapter
  );

  const {
    book: bookSetVerse,
    chapter: chapterSetVerse,
    verse: verseSetVerse,
  } = useSelector((state) => state.setVerse);
  useEffect(() => {
    if (newChapters.length < 1 && !bookLoading) {
      dispatch(setBookAction(bookSetVerse));
    }
    if (newVerses.length < 1 && !verseLoading) {
      dispatch(
        setChapterAction({ book: bookSetVerse, chapter: chapterSetVerse })
      );
    }
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
    newChapters,
    newVerses,
    bookLoading,
    verseLoading,
  ]);
  return (
    <Container fluid className='my-3 col-md-12'>
      <Row>
        <Col md='9' sm='12' xs={12} className='text-center bg-light'>
          <Row>
            {verseSetVerse <= 1 + '' ? (
              <span className='text-secondary text-bolder mytop padding-small mx-2'>
                Previous
              </span>
            ) : (
              <LinkContainer
                style={{ height: '36px', fontSize: '16px' }}
                className='mytop padding-small'
                to={`/word/${bookSetVerse}/${chapterSetVerse}/${
                  Number(verseSetVerse) - 16 < 1
                    ? 1
                    : Number(verseSetVerse) - (verseSetVerse <= 1 ? 0 : 16)
                }`}
              >
                <span className='text-primary text-bolder mx-2'>Previous</span>
              </LinkContainer>
            )}
            <Breadcrumb className='mytop padding-small mx-auto'>
              <LinkContainer to={`/word/${bookSetVerse}`}>
                <Breadcrumb.Item className='text-bolder'>
                  {bookSetVerse}
                </Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to={`/word/${bookSetVerse}/${chapterSetVerse}`}>
                <Breadcrumb.Item className='text-bolder'>
                  {Number(chapterSetVerse) < 1 ? 1 : chapterSetVerse}
                </Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer
                to={`/word/${bookSetVerse}/${chapterSetVerse}/${verseSetVerse}`}
              >
                <Breadcrumb.Item className='text-bolder'>
                  {Number(verseSetVerse) < 1 ? 1 : verseSetVerse}
                </Breadcrumb.Item>
              </LinkContainer>
            </Breadcrumb>
            {Number(verseSetVerse) + 16 >= Number(finalVerse) ? (
              <span className='text-secondary text-bolder mx-2 mytop padding-small'>
                Next
              </span>
            ) : (
              <LinkContainer
                style={{ height: '36px', fontSize: '16px' }}
                className='mytop padding-small'
                to={`/word/${bookSetVerse}/${chapterSetVerse}/${
                  Number(verseSetVerse) + (verseSetVerse >= finalVerse ? 0 : 16)
                }`}
              >
                <span className='text-primary text-bolder mx-2'>Next</span>
              </LinkContainer>
            )}
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
        <Col md='3' className='mobile-hide justify-content-center '>
          <div className='bg-light my-1'>
            <h6 className='text-center'>Chapters</h6>
            {newChapters.map((chapter, key) => {
              if (Math.abs(Number(chapter) - chapterSetVerse) < 15) {
                return (
                  <LinkContainer
                    key={key}
                    to={`/word/${bookSetVerse}/${chapter}/${verseSetVerse}`}
                  >
                    <Button
                      variant='light'
                      active={chapter + '' === chapterSetVerse || false}
                    >
                      {chapter}
                    </Button>
                  </LinkContainer>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className='bg-light my-1'>
            <h6 className='text-center'>Verses</h6>
            {newVerses.map((verse, key) => {
              if (Math.abs(Number(verse) - Number(verseSetVerse)) < 8) {
                return (
                  <LinkContainer
                    key={key}
                    to={`/word/${bookSetVerse}/${chapterSetVerse}/${verse}`}
                  >
                    <Button
                      variant='light'
                      active={verse + '' === verseSetVerse + ''}
                    >
                      {verse}
                    </Button>
                  </LinkContainer>
                );
              } else {
                return null;
              }
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
