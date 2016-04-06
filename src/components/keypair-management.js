import React from 'react';
import NavBar from './nav';
import Footer from './footer';

export default (props) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        { props.children }
      </div>
      <Footer />
    </div>
  );
};
