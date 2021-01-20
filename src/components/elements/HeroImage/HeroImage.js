import React from 'react';
import PropTypes from 'prop-types';
import './HeroImage.css';
import { Link } from 'react-router-dom';

const HeroImage = ({ image, title, text }) => (
  <div className="rmdb-heroimage"
    style={{
      background:
        `linear-gradient(to bottom, rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(33, 37, 41,0.95)
        100%),
        url('${image}'), #1c1c1c`
    }}
  >
    {/* <div className="rmdb-heroimage-content">
      <div className="rmdb-heroimage-text">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div> */}
  </div>
);

export const HeroCaption = ({ title, text, url }) => (
  <div className="rmdb-heroimage-content">
    <div className="rmdb-heroimage-text">
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="rmdb-cta-buttons">
        <Link to={'/' + url} style={{
          textDecoration: 'none'
        }} >
          <i className="la la-info"></i>&nbsp;View Details
        </Link>

        <Link to={'/' + url} className="btn-outline" style={{
          textDecoration: 'none'
        }} >
          Read more
        </Link>
      </div>
    </div>
  </div>
);

HeroImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

export default HeroImage;