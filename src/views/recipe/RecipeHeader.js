import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import auth from '../../Auth'
import Hidden from '@material-ui/core/Hidden'

import {format, fromUnixTime} from 'date-fns';

import {CroppedImage} from '../components/FilteredImage'

const HeaderImage = styled.div`
  grid-column-start:1;
  grid-column-end:8;
  grid-row-start:1;
  grid-row-end:2;
  height:360px;
  text-align: right;
  background-color:white;
`

const MobileHeaderImage = styled.div`
  grid-column-start:1;
  grid-column-end:13;
  grid-row-start:1;
  grid-row-end:2;
  height:360px;
  text-align: right;
  margin:-24px;
  margin-bottom:24px;
`

const DateStamps = ({createdAt, updatedAt}) => {
  const displayUpdatedAt = (updatedAt != null) && (createdAt != updatedAt);
  return (
    <>
    <Typography variant="overline" color="primary">
      PUBLISHED: {format(fromUnixTime(createdAt*0.001), 'PPP')}
    </Typography>          
    {displayUpdatedAt && <Typography variant='overline' color='primary'>
      LAST UPDATED: {format(fromUnixTime(updatedAt*0.001), 'PPP')}
    </Typography>}
    </>
  );
}

const RecipeHeader = ({name, createdAt, updatedAt, children, imageUrl, imageColor, imageAltText, recipeId}) => {
  return (
    <div id="container" style={{display:'grid',gridTemplateColumns:'repeat(12, 1fr)',columnGap:'24px',alignItems:'center'}}>
      <Hidden smDown>
        {auth.isAuthenticated() && <Link to={`/recipe/edit/${recipeId}`}><Button variant='contained'>Edit</Button></Link>}
        <HeaderImage>
          <CroppedImage imageUrl={imageUrl} alt={imageAltText}/>
        </HeaderImage>
        <div id="left" style={{gridColumnStart:8,gridColumnEnd:16,gridRowStart:1,gridRowEnd:2, zIndex:10}}>
          <DateStamps createdAt={createdAt} updatedAt={updatedAt}/>
          <Typography variant='h1' style={{fontWeight:'bold',lineHeight:'56px'}}>{name}</Typography>
          {children}
        </div>
      </Hidden>
      <Hidden mdUp>
        <MobileHeaderImage>
          <CroppedImage imageUrl={imageUrl} alt={imageAltText}/>
        </MobileHeaderImage>
        <div id="left" style={{gridColumnStart:1,gridColumnEnd:13,gridRowStart:2,gridRowEnd:3, zIndex:10}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><DateStamps createdAt={createdAt} updatedAt={updatedAt}/>
            {auth.isAuthenticated() && <Link to={`/recipe/edit/${recipeId}`}><Button variant='contained'>Edit</Button></Link>}</div>
          <Typography variant='h1' style={{fontWeight:'bold',lineHeight:'56px'}}>{name}</Typography>
          {children}
        </div>
      </Hidden>
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
