import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const NavContainer = styled.div`
  display:flex;
  justify-content:space-between;
  max-width: 100%;
  width: 1024px;
  min-width: 720px;
  padding: 24px;
`

const NavItem = styled(NavLink)`
  font-weight:normal;
  font-size:1.2em;
  color:rgba(0,0,0,0.72);
  padding:0.5em;
  &:last-of-type{
    padding-right:0;
  }
`

const activeStyle = {
  fontWeight: 'bold',
  color: 'red'
}

const Nav = () => {
  return(
    <>
      <div style={{display:'flex', justifyContent:'center'}}>
        <NavContainer>
          <Typography variant="h5"><NavLink exact to="/" activeStyle={activeStyle}>Droulangerie</NavLink></Typography>
          <div>
            <NavItem to="/recipes" activeStyle={activeStyle}>
              Recipes
            </NavItem>
            <NavItem to="/tags" activeStyle={activeStyle}>
              Tags
            </NavItem>
            <NavItem to="/about" activeStyle={activeStyle}>
              About
            </NavItem>
          </div>
        </NavContainer>
      </div>
    </>
  )
}

export default Nav;
