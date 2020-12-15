import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled, {keyframes} from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Emphasis = keyframes`
  from {
    transform: rotate3d(0,0,1,5deg);
  }
  to {
    transform: rotate3d(0,0,1,-5deg);
  }
`

const ShameShake = keyframes`
  from {
    transform: translateX(1px);
  }
  to {
    transform: translateX(-1px);
  }
`


const Really = styled.span`
  display:inline-block;
  font-weight:900;
  animation: ${Emphasis} 0.5s ease-in-out infinite;
  animation-direction: alternate;
`

const You = styled.span`
  display:inline-block;
  font-style:italic;
`

const Opinions = styled.span`
  display:inline-block;
  text-decoration:underline;
`

const Shame = styled.span`
  display:inline-block;
  animation: ${ShameShake} 0.1s linear infinite;
  animation-direction: alternate;
`

const NotFound = () => {
  const history = useHistory();
  return(
    <div style={{textAlign:'center'}}>
      <Paper style={{padding:48,marginTop:'6em',willChange:'transform'}}>
        <Typography variant="h3" gutterBottom>Sorry, I couldn't find the page you were looking for.</Typography>
        <Typography variant="body1" gutterBottom>That must be <Really>really</Really> embarassing for <You>you</You>. Andrew gets an email every time this happens. He knows.</Typography>
        <Typography variant="body2" gutterBottom>He has <Opinions>opinions</Opinions> about the URL you tried to access. He's afraid to google it, but he's sure it's gross.</Typography>
        <Typography variant="body2" style={{marginBottom:48}}><Shame>Shame on you.</Shame></Typography>
        <Button variant='contained' color='primary' startIcon={<ArrowBackIcon/>} onClick={() => {history.push(`/recipes`)}}>Back to Recipes</Button>
      </Paper>
    </div>
  )
}

export default NotFound;
