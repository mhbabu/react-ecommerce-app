import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <aside className='main-sidebar sidebar-dark-primary elevation-4'>
        <Link to='/dashboard' className='brand-link'>
          <img
            src='/assets/dist/img/AdminLTELogo.png'
            alt='AdminLTE Logo'
            className='brand-image img-circle elevation-3'
            style={{ opacity: ".8" }}
          />
          <span className='brand-text font-weight-light'>AdminLTE 3</span>
        </Link>

        <div className='sidebar'>
          <nav className='mt-2'>
            <ul
              className='nav nav-pills nav-sidebar flex-column'
              data-widget='treeview'
              role='menu'
              data-accordion='false'
            >
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  <i className='nav-icon fas fa-tachometer-alt' />
                  <p>Dashboard</p>
                </Link>
              </li>

              <li className='nav-item'>
                <ul className='nav-link'>
                  <i className='nav-icon fas fa-circle' />
                  <p>
                    Product Management
                    <i className='fas fa-angle-left right' />
                  </p>
                </ul>
                <ul className='nav nav-treeview'>
                  <li className='nav-item'>
                    <Link to='/product/attributes' className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Attributes</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/product/sub-attributes' className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Subattributes</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/product/categories' className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Categories</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/product/subcategories' className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Subcategories</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/products' className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Products</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
