import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';


const HealthBarWrapper = styled.div`
  span:first-child{
    margin-left:0;
  }
  span{
    margin-left:2px;
  }
`;

const AnimatedFontAwesomeIcon = animated(FontAwesomeIcon);

const FullHeart = ({isFull, key}) => {
  const transitions = useTransition(isFull, null, {
    from: {opacity:0, transform:'scale(2) rotateZ(0deg)'},
    enter: {opacity:1, transform:'scale(1) rotateZ(0deg)'},
    initial: {opacity:1, transform:'scale(1) rotateZ(0deg)'},
    leave: {opacity:0, transform:'scale(2) rotateZ(25deg)'},
  })

  return transitions.map(({ item, key, props }) => {
  return item && <AnimatedFontAwesomeIcon key={key} style={props} icon={fullHeart}/>
  })
}

const Heart = ({isFull}) => {
  return(
    <span className="fa-layers fa-fw">
        <FullHeart isFull={isFull}/>
        <FontAwesomeIcon icon={fullHeart} style={{opacity:0.2}}/>
    </span>
  )
}

const HealthBar = ({player}) => {
  return(
    <HealthBarWrapper>
    { [...Array(player.maxHealth)].map((_,index) => {
      return (<Heart key={`heart-${index}`} isFull={index < player.health}/>)
    })}
    </HealthBarWrapper>
  )
}

export default HealthBar;
