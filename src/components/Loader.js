import React from 'react';

const Loader = () => {
  return (
    <div
      className='spinner-border d-flex justify-content-center overlay text-primary mx-auto my-auto'
      role='status'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
};
export default Loader;
