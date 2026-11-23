import { NavLink, Link } from 'react-router-dom';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle,} from "flowbite-react";
// import logout
import { getIsAdmin, getIsAuth, logout } from '../slices/authSlice';
// import useDispatch
import { useDispatch, useSelector } from 'react-redux';
//import RetractableSearch from './RetractableSearch';
//import ThemeToggleButton from './ThemeToggleButton';

function Header({ branding }) {
  // Setup dispatch
  const dispatch = useDispatch();
  // Setup selectors
  const isAdmin = useSelector(getIsAdmin);
  const isAuth = useSelector(getIsAuth);
  console.log('isAdmin:', isAdmin);
  console.log('isAuth:', isAuth);
  
  //logout function to dispatch the logout action
  const leave = () => {
    console.log('Logout Clicked');
    dispatch(logout());
  }

  // Create some variables to store our JSX code
  // Create our admin links
  const adminLinks = (
    <>
      <DropdownItem as={Link} to='/admin'>Admin Dashboard</DropdownItem>
    </>
  )
  // AuthLinks
  const authLinks = (
    <>
      <DropdownItem className="nav-link" onClick={leave}>Logout</DropdownItem>
    </>
  )
  // create loginRegister links
  const loginRegisterLinks = (
    <>
      <DropdownItem>
        <Link className="nav-link" to="/login">Login</Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="nav-link" to="/signup">Register</Link>
      </DropdownItem>
    </>
  )

  return (
    <>
      <Navbar fluid rounded className='navbar'>
        <NavbarBrand as={NavLink} to="/">
          {/* 
          <img 
            src="image"
            className=" h-6 sm:h-12" 
            alt="Logo" />
          */}
          <span className='logo-text'><p>W</p></span>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{branding}</span>
        </NavbarBrand>

        {/* User menu */}
        <div className="flex md:order-2 p-1">
          {/* <RetractableSearch /> 
             <ThemeToggleButton />
          */}
          <Dropdown
            className="user-dropdown"
            arrowIcon={false}
            inline
            label={
              <div className="avatar-trigger">
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              </div>
            }
          >
      
            {/*<DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
              <DropdownDivider className='divider'/>
            </DropdownHeader>
            */}
            {/* Admin links */}
            { (isAdmin && isAuth) ? adminLinks : null}
            {/* Auth links / normal links */}
            { isAuth ? authLinks : loginRegisterLinks }
            <DropdownDivider />
          </Dropdown>
          <NavbarToggle />
        </div>
        
        <NavbarCollapse className="headerLinks">
          <div className="flex gap-6">
            <NavbarLink as={NavLink} to="/destinations"
            className='navlink'
            >
            Destinations
            </NavbarLink>
            <NavbarLink as={NavLink} to="/favourites"
            className='navlink'
            >
              Favourites
            </NavbarLink>
          </div>
        </NavbarCollapse>
      </Navbar>
    </>
  )
}

export default Header