import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import FilteredImage, { GreyscaleImage } from '../components/FilteredImage'

const ImagePosition = styled.div`
  grid-column-start:${props => props.side === 'LEFT' ? 1 : 4};
  grid-column-end:${props => props.side === 'LEFT' ? 10 : 13};
  grid-row-start:1;
  grid-row-end:2;
  img{
    object-fit:cover;
  }
  max-height:360px;
  overflow:hidden;
  box-shadow:0 0 0 0 rgba(0,0,0,0);
  transition:all 300ms ease-in-out;
`

const Text = styled.div`
  margin-top:48px;
  grid-column-start:${props => props.side === 'LEFT' ? 8 : 1};
  grid-column-end:${props => props.side === 'LEFT' ? 13 : 6};
  grid-row-start:1;
  grid-row-end:2;
  transform: translate(0, 0);
  transition:all 300ms ease-in-out;
  mix-blend-mode:normal;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap:24px;
  align-items:top;
  cursor: pointer;
  &:hover{
    ${ImagePosition}{
      box-shadow:0 4px 8px -1px rgba(0,0,0,0.25);
    }
    ${Text}{
      transform: translate(0, -5%);
    }
  }
`

const FeaturedRecipe = ({side, color, recipe}) => {
  const history = useHistory();
  return (
    <Wrapper onClick={()=>{history.push(`/recipe/${recipe.id}`)}}>
      <ImagePosition side={side}>
        <FilteredImage color={color || recipe.imageColor} side={side} imageUrl={recipe.imageUrl ?? `/images/pumpkin_tart.jpg`}/>
      </ImagePosition>
      <Text side={side}>
        <Typography variant='overline' color='primary'>RECIPE</Typography>
        <Typography gutterBottom variant='h1' style={{fontWeight:'bold',lineHeight:'56px',color:'rgba(0,0,0,.8)'}}>{recipe.name}</Typography>
      </Text>
    </Wrapper>
  )
}

FeaturedRecipe.propTypes = {
  side: PropTypes.oneOf(['LEFT','RIGHT']),
  recipe: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    imageUrl: PropTypes.string,
    imageColor: PropTypes.oneOf(['MAGENTA','CYAN','YELLOW']),
    imageAltText: PropTypes.string,
    recipeId: PropTypes.string.isRequired
  })
}

export default FeaturedRecipe;