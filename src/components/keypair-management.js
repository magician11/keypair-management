import React from 'react';
import NavBar from './nav';

export default (props) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        { props.children }
      </div>
    </div>
  );
};
