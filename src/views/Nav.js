import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  display:flex;
  justify-content:center;
`

const NavItem = styled(NavLink)`
  font-weight:bold;
  font-size:1.5em;
  color:rgba(0,0,0,0.72);
  padding:1em;
`

const navStyle = {
  display: 'flex'
}

const activeStyle = {
  fontWeight: 'bold',
  color: 'red'
}

const Nav = () => {
  return(
    <>
    <NavContainer>
      <NavItem exact to="/" activeStyle={activeStyle}>
        Home
      </NavItem>
      <NavItem to="/tags" activeStyle={activeStyle}>
        Tags
      </NavItem>
      <NavItem to="/about" activeStyle={activeStyle}>
        About
      </NavItem>
    </NavContainer>
    <hr/>
    </>
  )
}

export default Nav;
