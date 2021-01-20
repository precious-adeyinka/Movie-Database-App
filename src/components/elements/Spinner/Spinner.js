import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <React.Fragment>
    {/* <div className="loader"></div> */}
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  </React.Fragment>
)

export default Spinner;