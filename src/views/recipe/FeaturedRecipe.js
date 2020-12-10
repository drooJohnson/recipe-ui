import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';


const Gradients = {
  teal: {
    light:{color:'linear-gradient(to left, rgb(97,255,190), rgb(97,255,190))', blend:'darken'},
    dark:{color:'linear-gradient(to left, rgb(54,126,136), rgb(54,126,136))', blend:'lighten'},
    filter:'grayscale(100%) contrast(1.2) brightness(1.1)'
  },
  purple: {
    light:{color:'linear-gradient(to left, #88169d, #88169d)', blend:'lighten'},
    dark:{color:'linear-gradient(to top left, #ad75d7, #2174af)', blend:'hard-light'},
    filter:'grayscale(100%) contrast(1.0)'
  },
  yellow: {
    light:{color:'linear-gradient(to left, #e0de2c, #e0de2c)', blend:'multiply'},
    dark:{color:'linear-gradient(to left, #b71310, #b71310)', blend:'lighten'},
    filter:'grayscale(100%) contrast(1.2) brightness(1.2)'
  }
}

const Image = styled.div`
  grid-column-start:${props => props.side === 'LEFT' ? 1 : 4};
  grid-column-end:${props => props.side === 'LEFT' ? 10 : 13};
  grid-row-start:1;
  grid-row-end:2;
  height:360px;
  position:relative;
  box-shadow:0 0 0 0 rgba(0,0,0,0);
  transition:all 300ms ease-in-out;
`

const ImageBackground = styled.div`
  background: ${props => props.color ? Gradients[props.color].light.color : 'white'};
  height:100%;
  width:100%;
  position:relative;
  &::after{
    background:linear-gradient(${props => props.side === 'LEFT' ? 'to left' : 'to right'}, rgba(255,255,255,.3), rgba(255,255,255,0.0) 50%), ${props => props.color ? Gradients[props.color].dark.color : 'black'};
    background-blend-mode: screen;
    mix-blend-mode:${props => props.color ? Gradients[props.color].dark.blend : 'lighten'};
    content: '';
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
  }
`

const ImageContent = styled.img`
  mix-blend-mode: ${props => props.color ? Gradients[props.color].light.blend : 'darken'};
  filter: ${props => props.color ? Gradients[props.color].filter : 'grayscale(100%) contrast(1.2)'};
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
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
    ${Image}{
      box-shadow:0 4px 8px -1px rgba(0,0,0,0.25);
    }
    ${Text}{
      transform: translate(0, -5%);
    }
  }
`

const FeaturedRecipe = ({side, color, recipe}) => {
  const history = useHistory();
  //const color = recipe.color ?? 'teal';
  return (
    <Wrapper onClick={()=>{history.push(`/recipe/${recipe.id}`)}}>
      <Image color={color} side={side}>
        <ImageBackground color={color} side={side}>
          <ImageContent color={color} src={recipe.imageUrl ?? `/images/pumpkin_tart.jpg`}/>
        </ImageBackground>
      </Image>
      <Text side={side}>
        <Typography variant='overline' color='primary'>RECIPE</Typography>
        <Typography gutterBottom variant='h1' style={{fontWeight:'bold',lineHeight:'56px',color:'rgba(0,0,0,.8)'}}>{recipe.name}</Typography>
      </Text>
    </Wrapper>
  )
}

FeaturedRecipe.propTypes = {
  side: PropTypes.oneOf(['LEFT','RIGHT']),
  color: PropTypes.oneOf(['teal','purple','yellow']),
  recipe: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    imageUrl: PropTypes.string,
    recipeId: PropTypes.string.isRequired
  })
}

export default FeaturedRecipe;
