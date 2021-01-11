import React from 'react';

const Loader = () => {
  return (
    <div
      className='spinner-border d-flex justify-content-center text-primary'
      role='status'
    >
      <span class='sr-only'>Loading...</span>
    </div>
  );
};
export default Loader;
