import React from 'react';
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import FilteredImage from '../components/FilteredImage'

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

const StepText = ({step, stepNumber}) => {
  return (
    <div style={{marginBottom:36, gridColumnStart:'4', gridColumnEnd:'10'}}>
      <StepHeaderContainer style={{marginBottom:16}}>
        <Tick/>
        <Typography variant='h6' style={{color:'#FF9E3B', fontWeight:'900', marginRight:12}}>
          {stepNumber?.toString()?.padStart(2, '0') ?? step.displayOrder?.toString()?.padStart(2, '0')}
        </Typography>
        <Typography variant='h6'>
          {step.title}
        </Typography>
      </StepHeaderContainer>
      <Typography variant='body1' paragraph style={{marginLeft:'16px'}}>{step.text}</Typography>
    </div>
  )
}

const StepHeader = ({step, stepNumber}) => {
  return (
    <div style={{marginBottom:36, gridColumnStart:'4', gridColumnEnd:'10'}}>
      <StepHeaderContainer style={{marginBottom:16}}>
        <Typography variant='h5'>
          {step.title}
        </Typography>
      </StepHeaderContainer>
      <Typography variant='body1' paragraph style={{marginLeft:'16px'}}>{step.text}</Typography>
    </div>
  )
}

const StepImageGrid = styled.div`
  grid-column-start:1;
  grid-column-end:13;
  display:grid;
  grid-template-columns:repeat(12, 1fr);
  grid-template-rows: auto;
  column-gap:24px;
`

const StepImageCaption = styled.div`
  grid-column-start:${props => props.side === 'LEFT' ? '10' : '4'};
  grid-column-end:${props => props.side === 'LEFT' ? '13' : '13'};
`

const StepImg = styled.div`
  grid-column-start: ${props => props.side === 'LEFT' ? '1' : '4'};
  grid-column-end: ${props => props.side === 'LEFT' ? '10' : '13'};
  margin-bottom: ${props => props.side === 'LEFT' ? '0' : '16px'};
  width: 100%;
  object-fit: cover;
  max-height: 480px;
`

const CaptionBar = styled.div`
  display:block;
  width:100%;
  height: 4px;
  background-color: #FF6231;
  margin-bottom:16px;
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
