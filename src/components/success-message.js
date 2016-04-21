import React from 'react';
import { Alert } from 'react-bootstrap';

export default (props) => {
  return (
    <div>
      <Alert bsStyle={props.type}>
        <h3 className="text-center"><i className={`fa fa-${props.icon}`} aria-hidden="true"></i> {props.message}</h3>
      </Alert>
      <button className="btn btn-info center-block" onClick={props.reset}><i className="fa fa-undo" aria-hidden="true"></i> Start Over</button>
    </div>
  );
};
