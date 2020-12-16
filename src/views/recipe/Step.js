import React from 'react';
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import FilteredImage from '../components/FilteredImage'
import {device} from '../../utils/device'

const Tick = styled.div`
  width: 16px;
  height: 2px;
  background-color: black;
  &:first-child{
    margin-right: 16px;
  }
  &:last-child{
    margin-left: 16px;
  }
  @media ${device.mobile} {
    width: 8px;
    margin-left:-24px;
  }
`

const StepHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`


const Step = ({step, stepNumber}) => {
  switch(step.type){
    case "TEXT":
      return <StepText {...{step,stepNumber}}/>
    case "IMAGE":
      return <StepImage  {...{step,stepNumber}}/>
    case "HEADER":
      return <StepHeader {...{step,stepNumber}}/>
    default:
      return <div>What thef uck did you do?</div>
  }
}

const StepTextWrapper = styled.div`
  margin-bottom:36px;
  grid-column-start:4;
  grid-column-end:10;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
  }
`

const StepTextText = styled(Typography)`
  margin-left:16px;
  @media ${device.mobile} {
    margin-left:0;
  }
`


const StepText = ({step, stepNumber}) => {
  return (
    <StepTextWrapper>
      <StepHeaderContainer style={{marginBottom:16}}>
        <Tick/>
        <Typography variant='h6' style={{color:'#FF9E3B', fontWeight:'900', marginRight:12}}>
          {stepNumber?.toString()?.padStart(2, '0') ?? step.displayOrder?.toString()?.padStart(2, '0')}
        </Typography>
        <Typography variant='h6'>
          {step.title}
        </Typography>
      </StepHeaderContainer>
      <StepTextText variant='body1' paragraph>{step.text}</StepTextText>
    </StepTextWrapper>
  )
}

const StepHeaderWrapper = styled.div`
  margin-bottom:36px;
  grid-column-start:4;
  grid-column-end:10;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
  }
`

const StepHeader = ({step, stepNumber}) => {
  return (
    <StepHeaderWrapper>
      <StepHeaderContainer style={{marginBottom:16}}>
        <Typography variant='h5'>
          {step.title}
        </Typography>
      </StepHeaderContainer>
      <Typography variant='body1' paragraph style={{marginLeft:'16px'}}>{step.text}</Typography>
    </StepHeaderWrapper>
  )
}

const StepImageGrid = styled.div`
  grid-column-start:1;
  grid-column-end:13;
  display:grid;
  grid-template-columns:repeat(12, 1fr);
  grid-template-rows: auto;
  column-gap:24px;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
  }
`

const StepImageCaption = styled.div`
  grid-column-start:${props => props.side === 'LEFT' ? '10' : '4'};
  grid-column-end:${props => props.side === 'LEFT' ? '13' : '13'};
  @media ${device.mobile} {
    margin-top:16px;
    grid-column-start:1;
    grid-column-end:13;
  }
`

const StepImg = styled.div`
  grid-column-start: ${props => props.side === 'LEFT' ? '1' : '4'};
  grid-column-end: ${props => props.side === 'LEFT' ? '10' : '13'};
  margin-bottom: ${props => props.side === 'LEFT' ? '0' : '16px'};
  width: 100%;
  object-fit: cover;
  max-height: 480px;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
  }
`

const CaptionBar = styled.div`
  display:block;
  width:100%;
  height: 4px;
  background-color: #FF6231;
  margin-bottom:16px;
  @media ${device.mobile} {
    display: none;
  }
`

const StepImage = ({step, stepNumber}) => {
  return (
    <StepImageGrid style={{marginBottom:36}}>
      <StepImg side={step.side}>
        <FilteredImage imageUrl={step.imageUrl} side={'RIGHT'} color={step.color} gradientStart='0%' gradientEnd='50%'/>
      </StepImg>
      {(step.title || step.text) &&
      <StepImageCaption side={step.side}>
        <CaptionBar/>
        <Typography variant='subtitle2'>
          {step.title}
        </Typography>
        <Typography variant='caption'>
          {step.text}
        </Typography>
      </StepImageCaption>}
    </StepImageGrid>
  )
}

Step.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.oneOf(['TEXT','IMAGE','HEADER']).isRequired
  }).isRequired,
  stepNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Step;
