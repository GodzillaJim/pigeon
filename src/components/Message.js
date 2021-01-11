import React from 'react';

const Message = ({ props }) => {
  return (
    <div className='alert' {...props}>
      {props.children}
    </div>
  );
};

export default Message;
