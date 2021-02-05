import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

const _404Error = () => {
  return (
    <div className='mx-auto my-auto'>
      <i className='fas fa-exclamation-triange h3 text-primary'></i>
      <p>
        <span className='h4'>Sorry we didn't find that page.</span>
        <LinkContainer to='/'>
          <Button variant='link'>Home</Button>
        </LinkContainer>
        ? Or{' '}
        <LinkContainer to='/search'>
          <Button variant='link'>Search</Button>
        </LinkContainer>
      </p>
    </div>
  );
};

export default _404Error;
