import { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle,} from "flowbite-react";
// import logout
import { getIsAdmin, getIsAuth, logout } from '../slices/authSlice';
// import useDispatch
import { useDispatch, useSelector } from 'react-redux';
//import RetractableSearch from './RetractableSearch';

function Header({ branding }) {
  // Setup dispatch
  const dispatch = useDispatch();
  // Setup selectors
  const isAdmin = useSelector(getIsAdmin);
  const isAuth = useSelector(getIsAuth);
  
  // Create a leave function to dispatch the logout action
  const leave = () => {
    console.log('Logout Clicked');
    dispatch(logout());
  }

  // Create some variables to store our JSX code
  // Create our admin links
  const adminLinks = (
    <Fragment key={'2'}>
      <li className="nav-item">
        <Link className="nav-link" to="/add-destination">Add destination</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/admin'> Admin Dashboard</Link>
      </li>
    </Fragment>
  )
  // AuthLinks
  const authLinks = (
    <Fragment key={'3'}>
      <li className="nav-item">
        <Link className="nav-link" onClick={leave}>Logout</Link>
      </li>
    </Fragment>
  )
  // create loginRegister links
  const loginRegisterLinks = (
    <Fragment key={'4'}>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">Register</Link>
      </li>
    </Fragment>
  )

  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand as={NavLink} to="/">
          <span className="logo">{branding}</span>
        </NavbarBrand>

        {/* User menu */}
        <div className="flex md:order-2">
          {/* <RetractableSearch /> */}
          <Dropdown
          className="hover:bg-transparent hover:text-inherit"
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </DropdownHeader>
            <DropdownItem>
              {/* Admin links */}
              { (isAdmin && isAuth) ? adminLinks : null}
            </DropdownItem>
            <DropdownItem>
              {/* Auth links / normal links */}
              { isAuth ? authLinks : loginRegisterLinks }
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>Dark mode</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        
        <NavbarCollapse>
          <div className="flex gap-6">
            <NavbarLink as={NavLink} to="/destinations"
            >
            Destinations
            </NavbarLink>
            <NavbarLink as={NavLink} to="/favourites">
              Favourites
            </NavbarLink>
          </div>
        </NavbarCollapse>
      </Navbar>
    </>
  )
}

export default Header