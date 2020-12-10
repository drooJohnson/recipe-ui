import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';

import { useDrag, useDrop } from 'react-dnd';

const StepCard = ({step, index, addStep, updateStep, removeStep, moveStep}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'step',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Find screen rect
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }

      // Time to actually perform the action
      moveStep(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'step', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return(
    <Grid
      item
      xs={12}
      style={{
        display:'flex',
        justifyContent:'stretch',
        alignItems:'flex-start'
      }}
      ref={ref}
      >
      <Card style={{flexGrow:1, opacity}}>
        <CardHeader
          action={
            <IconButton aria-label="delete" onClick={()=>{removeStep(index)}}><DeleteIcon/></IconButton>
          }
          title={`Step ${step.displayOrder ?? index+1 }`}
          />
        <CardContent style={{paddingTop:0}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Title'
              value={step.title ?? ''}
              fullWidth
              onChange={(event) => {updateStep({...step, title: event.target.value}, index)}}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Text'
              value={step.text ?? ''}
              fullWidth
              multiline
              onChange={(event) => {updateStep({...step, text: event.target.value}, index)}}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default StepCard;
