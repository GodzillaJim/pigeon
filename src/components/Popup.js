import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { LinkContainer } from 'react-router-bootstrap';

const Popup = ({ show, books, history }) => {
  useEffect(() => {}, [books, show]);
  const handleClose = () => {
    show = !show;
    history.push(`/`);
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>Sorry. Suggestions?</Modal.Header>
      <Modal.Body>
        {books.length < 1
          ? "We didn't find what you're looking for."
          : books.map((book, key) => (
              <p key={key}>
                <LinkContainer key={key} to={`/word/${book}`}>
                  <span>{book}</span>
                </LinkContainer>
                {key === Number(books.length) - 1 ? '.' : ', '}
              </p>
            ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(Popup);
