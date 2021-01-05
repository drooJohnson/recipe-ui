import React, { useState } from 'react';
import { NavLink,  useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import auth from '../Auth';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const NavContainer = styled.div`
  display:flex;
  justify-content:space-between;
  max-width: 1024px;
  width: 100%;
  padding: 24px;
`

const NavItem = styled(NavLink)`
  font-weight:normal;
  font-size:1.2em;
  color:rgba(0,0,0,0.72);
  text-decoration: none;
  padding:0.5em;
  &:last-of-type{
    padding-right:0;
  }
`

const activeStyle = {
  fontWeight: 'bold'
}

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return(
    <>
      <SwipeableDrawer
        disableDiscovery={iOS}
        disable sBackdropTransition={!iOS}
        anchor='top'
        open={open}
        onClose={()=>{setOpen(false)}}
        onOpen={()=>{setOpen(true)}}
      >
        <List>
          <ListItem button component="a" href="/recipes" key="recipes"><ListItemText primary="Recipes"/></ListItem>
          <ListItem button component="a" href="/tags" key="tags"><ListItemText primary="Tags"/></ListItem>
          <ListItem button component="a" href="/about" key="about"><ListItemText primary="About"/></ListItem>
        </List>
      </SwipeableDrawer>
      <AppBar position='static' style={{color:'white',backgroundColor:'rgba(0,0,0,0.87)'}} color="inherit">
        <Toolbar>
          <IconButton edge='start' color="inherit" aria-label="menu" onClick={()=>{setOpen(true)}}><MenuIcon/></IconButton>
          <Typography variant='h6' color="inherit" onClick={()=>{history.push("/")}}>He Bakes</Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

const Nav = () => {
  const history = useHistory();

  const logout = () => {
    auth.logout();
    history.replace('/');
  }

  const isAuthenticated = auth.isAuthenticated();

  return(
    <>
      <Hidden mdUp>
        <MobileNav/>
      </Hidden>
      <Hidden smDown>
      <div style={{display:'flex', justifyContent:'center'}}>
        <NavContainer>
          <Typography variant="h5">
            <NavLink exact to="/" style={{textDecoration:'none'}} activeStyle={activeStyle}>He Bakes</NavLink>
          </Typography>
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
            { (isAuthenticated) && (
              <>
              <NavItem to="/admin" activeStyle={activeStyle}>Admin</NavItem>
              <span style={{color:'rgba(0,0,0,0.72)',fontSize:'1.2em',padding:'0.5em',paddingLeft:'1em'}} onClick={()=> logout()}>
                Logout
              </span>
              </>
            ) }
          </div>
        </NavContainer>
      </div>
      </Hidden>
    </>
  )
}

export default Nav;
