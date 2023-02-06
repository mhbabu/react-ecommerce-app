import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top mb-5'>
      <Link className='navbar-brand' to='/'>
        Vidly
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarsExampleDefault'
        aria-controls='navbarsExampleDefault'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Movies
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='customers'>
              Customers
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='rentals'>
              Rentals
            </Link>
          </li>

          {!user && (
            <React.Fragment>
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  <i className='fa fa-user-circle mr-1' />
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  <i className='fa fa-key mr-1' />
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <li className='nav-item'>
                <Link className='nav-link' to='/profile'>
                  <i className='fa fa-user-circle mr-1' />
                  {user.name}
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/logout'>
                  <i className='fa fa-lock mr-1' />
                  Logout
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
