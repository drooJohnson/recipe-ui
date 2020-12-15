import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import auth from '../../Auth'

import FilteredImage from '../components/FilteredImage'

const HeaderImage = styled.div`
  grid-column-start:4;
  grid-column-end:13;
  grid-row-start:1;
  grid-row-end:2;
  height:360px;
  text-align: right;
`

const RecipeHeader = ({name, date, children, imageUrl, imageColor, imageAltText, recipeId}) => {
  return (
    <div id="container" style={{display:'grid',gridTemplateColumns:'repeat(12, 1fr)',columnGap:'24px',alignItems:'center'}}>
      {auth.isAuthenticated() && <Link to={`/recipe/edit/${recipeId}`}><Button variant='contained'>Edit</Button></Link>}
      <HeaderImage>
        <FilteredImage imageUrl={imageUrl} color={imageColor} alt={imageAltText} side={'RIGHT'}/>
      </HeaderImage>
      <div id="left" style={{gridColumnStart:1,gridColumnEnd:6,gridRowStart:1,gridRowEnd:2, zIndex:10}}>
        <Typography variant='overline' color='primary'>RECIPE</Typography>
        <Typography variant='h1' style={{fontWeight:'bold',lineHeight:'56px'}}>{name}</Typography>
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
