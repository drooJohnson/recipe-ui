import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { useDrag, useDrop } from 'react-dnd';

const IngredientCard = ({ingredient, index, addIngredient, updateIngredient, removeIngredient, moveIngredient}) => {
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
      moveIngredient(dragIndex, hoverIndex);

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

  if (ingredient.type === "HEADER"){return(
    <ListItem style={{display:'flex',alignItems:'center',justifyContent:'stretch',paddingRight:'64px',paddingLeft:'8px', opacity}} ref={ref}>
      <ListItemIcon style={{minWidth:'32px'}}>
        <DragIndicatorIcon/>
      </ListItemIcon>
      <Grid container spacing={3} style={{display:'flex',alignItems:'center',justifyContent:'stretch', flexGrow:1}}>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            label='Section Name'
            size='small'
            fullWidth
            defaultValue={ingredient.name ?? ''}
            onBlur={(event) => {updateIngredient({...ingredient, name: event.target.value}, index)}}
            />
        </Grid>
      </Grid>
      <ListItemSecondaryAction style={{marginLeft:16, opacity}}><IconButton onClick={()=>{removeIngredient(index)}} style={{marginRight:-8}} aria-label="delete"><DeleteIcon/></IconButton></ListItemSecondaryAction>
    </ListItem>
  )

  } else {
    return(
      <ListItem style={{display:'flex',alignItems:'center',justifyContent:'stretch',paddingRight:'64px',paddingLeft:'8px', opacity}} ref={ref}>
        <ListItemIcon style={{minWidth:'32px'}}>
          <DragIndicatorIcon/>
        </ListItemIcon>
        <Grid container spacing={3} style={{display:'flex',alignItems:'center',justifyContent:'stretch', flexGrow:1}}>
          <Grid item xs={2}>
            <TextField
              variant='outlined'
              label='Quantity'
              size='small'
              fullWidth
              defaultValue={ingredient.quantity ?? ''}
              onBlur={(event) => {updateIngredient({...ingredient, quantity: event.target.value}, index)}}
              />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant='outlined'
              label='Unit'
              size='small'
              fullWidth
              defaultValue={ingredient.unit ?? ''}
              onBlur={(event) => {updateIngredient({...ingredient, unit: event.target.value}, index)}}
              />
          </Grid>
          <Grid item xs={8} style={{flexGrow:1}}>
            <TextField
              variant='outlined'
              label='Name'
              size='small'
              fullWidth
              defaultValue={ingredient.name ?? ''}
              onBlur={(event) => {updateIngredient({...ingredient, name: event.target.value}, index)}}
              style={{marginRight:16}}
              />
          </Grid>
        </Grid>
        <ListItemSecondaryAction style={{marginLeft:16, opacity}}><IconButton onClick={()=>{removeIngredient(index)}} style={{marginRight:-8}} aria-label="delete"><DeleteIcon/></IconButton></ListItemSecondaryAction>
      </ListItem>
    )
  }

}

export default IngredientCard;
