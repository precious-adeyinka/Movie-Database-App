import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // State Variables
  const [shouldHeaderChange, setHeaderChange] = React.useState(false);

  // Hook Lifecycle
  React.useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 60) {
        setHeaderChange(true);
      } else {
        setHeaderChange(false);
      }
    }
  }, [shouldHeaderChange]);

  return (
    <div className={shouldHeaderChange === true ? "rmdb-header-sticky" : "rmdb-header"}>
      <div className="rmdb-header-content">
        <Link to="/">
          <img className="rmdb-logo" src="/images/reactMovie_logo.png" alt="rmdb-logo" />
        </Link>
        <img className="rmdb-tmdb-logo" src="/images/tmdb_logo.png" alt="tmdb-logo" />
      </div>
    </div>
  )
}

export default Header;