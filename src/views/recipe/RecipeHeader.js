import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const HeaderImage = styled.div`
  grid-column-start:4;
  grid-column-end:13;
  grid-row-start:1;
  grid-row-end:2;
  height:360px;
  background: linear-gradient(to right, rgba(255, 120, 150, 1.0) 5%, rgba(255, 120, 150, 0.0) 50%), linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 90%), linear-gradient(to right, rgba(0,0,0,1.0) 5%, rgba(0,0,0,0) 50%), url("${(props) => props.imageUrl ?? "/images/ube_cake.jpg"}");
  background-size: cover;
  background-position-y: 25%;
  background-blend-mode: hard-light, soft-light, color, normal;
  text-align: right;
  padding: 24px;
`

const RecipeHeader = ({name, date, children, imageUrl, recipeId}) => {
  return (
    <div id="container" style={{display:'grid',gridTemplateColumns:'repeat(12, 1fr)',columnGap:'24px',alignItems:'center'}}>
      <HeaderImage imageUrl={imageUrl}>
        <Link to={`/recipe/edit/${recipeId}`}><Button variant='contained'>Edit</Button></Link>
      </HeaderImage>
      <div id="left" style={{gridColumnStart:1,gridColumnEnd:6,gridRowStart:1,gridRowEnd:2}}>
        <Typography variant='overline' color='primary'>RECIPE</Typography>
        <Typography gutterBottom variant='h1' style={{fontWeight:'bold',lineHeight:'56px'}}>{name}</Typography>
        {children}
      </div>
    </div>
  )
}

RecipeHeader.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  imageUrl: PropTypes.string,
  recipeId: PropTypes.string.isRequired
}

export default RecipeHeader;
