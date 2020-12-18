import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import StepCard from './StepCard';
import { v4 as uuidv4 } from 'uuid';

import * as _ from 'lodash';

import update from 'immutability-helper';

export const Steps = ({updateSteps, steps}) => {
  const calcDisplayOrder = (steps) => {
    var displayOrder = 1;
    var stepsOrdered = steps.map((step) => {
      if(step.delete) {
        return {...step }
      } else {
        return {...step, displayOrder: displayOrder++ };
      }
    });

    return stepsOrdered;
  }

  const addStep = () => {
    let newStep = {text:null, key:`new-${steps.length+1}`, type: "TEXT", title: null, uiKey: uuidv4()};
    // auto-assign a key since this step won't have a DB ID to use as one
    updateSteps(calcDisplayOrder([...steps, newStep]));
  }

  const addStepImage = () => {
    let newStep = {text:null, key:`new-${steps.length+1}`, type: "IMAGE", title: null, uiKey: uuidv4()};
    // auto-assign a key since this step won't have a DB ID to use as one
    updateSteps(calcDisplayOrder([...steps, newStep]));
  }

  const addStepHeader = () => {
    let newStep = {text:null, key:`new-${steps.length+1}`, type: "HEADER", title: null, uiKey: uuidv4()};
    // auto-assign a key since this step won't have a DB ID to use as one
    updateSteps(calcDisplayOrder([...steps, newStep]));
  }

  const updateStep = (step,index) => {
    var newSteps = [...steps];
    newSteps[index] = {...step};
    updateSteps(newSteps);
  }

  const moveStep = (dragIndex, hoverIndex) => {
    const dragStep = steps[dragIndex];
    updateSteps(
      calcDisplayOrder(
        update(
          steps, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragStep]
            ]
          }
        )
      )
    )
  }

  const removeStep = (stepToRemove) => {

    if (stepToRemove.id) {
      let newSteps = steps.map((step) => {
        if (step.id === stepToRemove.id) {
          return { ...step, delete: true}
        } else { return step }
      })

      return updateSteps(calcDisplayOrder(newSteps));

    } else if (stepToRemove.uiKey) {
      let newSteps = steps.filter((step) => {
        if(step.uiKey === stepToRemove.uiKey) {
          return false;
        } else {
          return true;
        }
      })

      return updateSteps(calcDisplayOrder(newSteps));
    }
  }

  let orderedSteps = _.orderBy(steps, ['displayOrder'])

  return (
    <Grid container spacing={2} style={{marginBottom:'24px'}}>
      <Grid item xs={12}><Typography variant='h5'>Steps</Typography></Grid>
      {orderedSteps.map((step,index) => {
        if (step.delete) { return null }
        return(
          <StepCard step={step} index={index} addStep={addStep} updateStep={updateStep} removeStep={removeStep} moveStep={moveStep} key={step.id ?? step.uiKey}/>
        )
      })}
      <Grid item xs={12}>
        <ButtonGroup variant='contained' color='primary' type='button' fullWidth>
          <Button onClick={addStep}>New Step</Button>
          <Button onClick={addStepImage}>New Image</Button>
          <Button onClick={addStepHeader}>New Section</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

Steps.propTypes = {
  updateSteps: PropTypes.func,
  steps: PropTypes.array,
}

Steps.defaultProps = {
  updateSteps: (newSteps) => { console.log(newSteps); },
  steps: []
}

export default Steps;
