import React from 'react';
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import FilteredImage from '../components/FilteredImage'
import {device} from '../../utils/device'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';

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
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
    opacity:0.85;
  }
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
  @media ${device.mobile} {
    grid-column-start:2;
    grid-column-end:9;
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap:24px;
  align-items:top;
  cursor: pointer;
  &:hover,&:active{
    ${ImagePosition}{
      box-shadow:0 4px 8px -1px rgba(0,0,0,0.25);
    }
    ${Text}{
      transform: translate(0, -5%);
    }
  }
  @media ${device.mobile} {
    align-items: top;
  }
`

const FeaturedRecipe = ({side, color, recipe}) => {
  const mobile = useMediaQuery(`${device.mobile}`);
  const history = useHistory();
  return (
    <>
        <Wrapper onClick={()=>{history.push(`/recipe/${recipe.id}`)}}>

          <ImagePosition side={mobile ? 'RIGHT' : side}>
            <FilteredImage color={color || recipe.imageColor} side={mobile ? 'RIGHT' : side} imageUrl={recipe.imageUrl ?? `/images/pumpkin_tart.jpg`} gradientStart={mobile ? "50%" : null} gradientEnd={mobile ? "200%" : null}/>
          </ImagePosition>
          <Text side={mobile ? 'RIGHT' : side}>
              <Typography variant='overline' color='primary'>RECIPE</Typography>
              <Typography gutterBottom variant='h1' style={{fontWeight:'bold',lineHeight:'56px',color:'rgba(0,0,0,.8)'}}>{recipe.name}</Typography>
           </Text>
        </Wrapper>
    </>
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
