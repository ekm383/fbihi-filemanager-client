import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import FBILogo from "../assets/fbihi-logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Redux methods
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOG_OUT",
      payload: null,
    });
    history.push("/");
  };

  return (
    <div className='header'>
      <div className='logo-nav'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={FBILogo} className='logo' alt='logo' />
          </Link>
        </div>

        <ul className={click ? "nav-options active" : "nav-options"}>
          {user && user.role === "admin" && (
            <>
              <NavLink
                to='/upload'
                className='option'
                onClick={closeMobileMenu}
              >
                Upload
              </NavLink>
              <NavLink
                to='/medicare'
                className='option'
                onClick={closeMobileMenu}
              >
                Medicare
              </NavLink>
              <NavLink
                to='/aloha-care'
                className='option'
                onClick={closeMobileMenu}
              >
                Aloha Care
              </NavLink>
              <NavLink to='/hmsa' className='option' onClick={closeMobileMenu}>
                HMSA
              </NavLink>
              <NavLink
                to='/humana'
                className='option'
                onClick={closeMobileMenu}
              >
                Humana
              </NavLink>
              <NavLink
                to='/kaiser'
                className='option'
                onClick={closeMobileMenu}
              >
                Kaiser
              </NavLink>
              <NavLink
                to='/united-healthcare'
                className='option'
                onClick={closeMobileMenu}
              >
                UHC
              </NavLink>
              <NavLink to='/ohana' className='option' onClick={closeMobileMenu}>
                Ohana
              </NavLink>
              <button className='logout-button' onClick={logout}>
                Logout
              </button>
            </>
          )}
          {user && user.role === "subscriber" && (
            <>
              <NavLink
                to='/medicare'
                className='option'
                onClick={closeMobileMenu}
              >
                Medicare
              </NavLink>
              <NavLink
                to='/aloha-care'
                className='option'
                onClick={closeMobileMenu}
              >
                Aloha Care
              </NavLink>
              <NavLink to='/hmsa' className='option' onClick={closeMobileMenu}>
                HMSA
              </NavLink>
              <NavLink
                to='/humana'
                className='option'
                onClick={closeMobileMenu}
              >
                Humana
              </NavLink>
              <NavLink
                to='/kaiser'
                className='option'
                onClick={closeMobileMenu}
              >
                Kaiser
              </NavLink>
              <NavLink
                to='/united-healthcare'
                className='option'
                onClick={closeMobileMenu}
              >
                UHC
              </NavLink>
              <NavLink to='/ohana' className='option' onClick={closeMobileMenu}>
                Ohana
              </NavLink>
              <button className='logout-button' onClick={logout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
      <div className='mobile-menu' onClick={handleClick}>
        {click ? (
          <AiOutlineClose className='menu-icon' />
        ) : (
          <AiOutlineMenu className='menu-icon' />
        )}
      </div>
    </div>
  );
};

export default Header;
