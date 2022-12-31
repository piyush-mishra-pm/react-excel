import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className="ui borderless huge menu">
      <Link to="/" className="ui header item">
        Sheet Tools
      </Link>
      <div className="menu right">
        <div className="item">
          <Link className="ui primary button" to="/validator">
            Sheet Validator
          </Link>
        </div>
        <div className="item">
          <Link className="ui primary button" to="/comparer">
            Sheet Comparer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
