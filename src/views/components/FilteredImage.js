import React from 'react';
import styled from 'styled-components'

const Colors = {
  MAGENTA: {
    startColor: 'rgba(255, 100, 180, 1.0)',
    endColor: 'rgba(255, 100, 180, 0.0)',
    gradient:'linear-gradient(to right, rgba(255, 100, 180, 1.0) -5%, rgba(255, 100, 180, 1.0) 10%, rgba(255, 100, 180, 0.0) 95%)',
    blend:'hard-light'
  },
  CYAN: {
    startColor: 'rgba(80, 150, 255, 1.0)',
    endColor: 'rgba(80, 150, 255, 0.0)',
    gradient:'linear-gradient(to right, rgba(80, 150, 255, 1.0) -5%, rgba(80, 150, 255, 1.0) 10%, rgba(80, 150, 255, 0.0) 95%)',
    blend:'lighten'
  },
  YELLOW: {
    startColor: 'rgba(230, 245, 100, 1.0)',
    endColor: 'rgba(230, 245, 100, 0.0)',
    gradient:'linear-gradient(to right, rgba(230, 245, 100, 1.0) -5%, rgba(230, 245, 100, 1.0) 10%, rgba(230, 245, 100, 0.0) 95%)',
    blend:'lighten'
  }
}

const ImageWrapper = styled.div`
  width:100%;
  height:100%;
  position:relative;
  overflow:hidden;
`

const ImageDesaturation = styled.div`
  display:block;
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background: linear-gradient(to right, rgba(0,0,0,1.0) 10%, rgba(0,0,0,0) 50%);
  mix-blend-mode: color;
  transform: ${props => props.side === 'LEFT' ? 'rotateZ(180deg)' : 'rotateZ(0deg)'};
`

const ImageGradient = styled.div`
  width:102%;
  height:100%;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background:
    ${props => props.color ?
      `linear-gradient(to right,
        ${Colors[props.color].startColor} ${props?.gradientStart ?? '-5%'},
        ${Colors[props.color].startColor} ${props?.gradientStart ?? '10%'},
        ${Colors[props.color].endColor} ${props?.gradientEnd ?? '95%'} )`
      :
      'transparent'};
  mix-blend-mode: ${props => props.color ? Colors[props.color].blend : 'normal'};
  transform: ${props => props.side === 'LEFT' ? 'rotateZ(180deg)' : 'rotateZ(0deg)'};
`

const ImageContent = styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center center;
`

const FilteredImage = ({color, side, gradientStart, gradientEnd, imageUrl}) => {
  return(
    <ImageWrapper>
      {color && <ImageDesaturation color={color} side={side} gradientStart={gradientStart} gradientEnd={gradientEnd} />}
      {color && <ImageGradient color={color} side={side} gradientStart={gradientStart} gradientEnd={gradientEnd} />}
      <ImageContent color={color} src={imageUrl ?? `/images/pumpkin_tart.jpg`}/>
    </ImageWrapper>
  )
}

const GreyscaleWrapper = styled.div`
  position:relative;
  object-fit:cover;
`

const GreyscaleImageContent = styled.img`
  filter: grayscale(100%) opacity(0.3) contrast(1.2) brightness(1.2);
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
`

export const GreyscaleImage = ({imageUrl}) => {
  return(
    <GreyscaleWrapper>
      <GreyscaleImageContent src={imageUrl ?? `/images/pumpkin_tart.jpg`}/>
    </GreyscaleWrapper>
  )
}

const TintedWrapper = styled.div`
  width:100%;
  height:100%;
  position:relative;
  background-color:white;
`

const ImageTint = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color:
    ${props => props.color ? Colors[props.color].startColor : 'transparent'};
  mix-blend-mode: ${props => props.color ? Colors[props.color].blend : 'normal'};
`

const TintedImageContent = styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center center;
  filter: grayscale(1.0) contrast(1.5) opacity(0.3);
  transition: filter 300ms linear;
  &:hover{
    filter: grayscale(0.0) contrast(1.0) opacity(1.0);
  }
`

export const TintedImage = ({color, imageUrl, alt}) => {
  return(
    <TintedWrapper>
      {color && <ImageTint color={color}/>}
      <TintedImageContent alt={alt} color={color} src={imageUrl ?? `/images/pumpkin_tart.jpg`}/>
    </TintedWrapper>
  )
}

export default FilteredImage;
