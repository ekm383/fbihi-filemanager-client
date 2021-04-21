import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import FBILogo from "../assets/fbihi-logo.png";

const Header = () => {
  return (
    <StyledHeader>
      <div className='logo'>
        <Link to='/'>
          <img src={FBILogo} alt='logo' />
        </Link>
      </div>
      <nav>
        <NavLink to='/medicare'>Medicare</NavLink>
        <NavLink to='/aloha-care'>Aloha Care</NavLink>
        <NavLink to='/hmsa'>HMSA</NavLink>
        <NavLink to='/humana'>Humana</NavLink>
        <NavLink to='/humana-benefits'>Humana Benefits</NavLink>
        <NavLink to='/kaiser'>Kaiser</NavLink>
        <NavLink to='/united-healthcare'>UHC</NavLink>
        <NavLink to='/united-healthcare-benefits'>UHC Benefits</NavLink>
        <NavLink to='/ohana'>Ohana</NavLink>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
  .logo {
    flex-basis: 20%;
    img {
      width: 50%;
    }
  }
  nav {
    a {
      color: #1045d6;
      margin: 11px;
      font-size: 16px;
      &:hover {
        text-decoration: none;
      }
    }
  }
`;

export default Header;
