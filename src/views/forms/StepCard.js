import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import UploadFile from '../UploadFile';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MDEditor from '@uiw/react-md-editor';

import { useEnumValues } from '../../utils/useEnumValues';
import { useDrag, useDrop } from 'react-dnd';


const StepCard = ({step, index, addStep, updateStep, removeStep, moveStep}) => {

  const {data:imageColorOptions} = useEnumValues("ImageColor");
  const {data:imageSideOptions} = useEnumValues("ImageSide");

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
  if (step.type === 'HEADER'){
    return <HeaderStep ref={ref} {...{step, opacity, index, addStep, updateStep, removeStep, moveStep}}/>
  } else if (step.type === 'IMAGE'){
    return <ImageStep ref={ref} {...{step, opacity, imageColorOptions, imageSideOptions, index, addStep, updateStep, removeStep, moveStep}}/>
  } else {
    return <TextStep ref={ref} {...{step, opacity, index, addStep, updateStep, removeStep, moveStep}}/>
  }
}

const TextStep = ({step, opacity, index, addStep, updateStep, removeStep, moveStep}) => {
    const [text, setText] = useState(step.text);
    return(
      <Grid
        item
        xs={12}
        style={{
          display:'flex',
          justifyContent:'stretch',
          alignItems:'flex-start'
        }}
        >
          <Card style={{flexGrow:1, opacity}}>
            <CardHeader
              action={
                <IconButton aria-label="delete" onClick={()=>{removeStep(step)}}><DeleteIcon/></IconButton>
              }
              title={`Step ${step.displayOrder ?? index+1 }`}
              />
            <CardContent style={{paddingTop:0}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  label='Title'
                  defaultValue={step.title ?? ''}
                  fullWidth
                  onBlur={(event) => {updateStep({...step, title: event.target.value}, index)}}
                  />
              </Grid>
              <Grid item xs={12}>
                <MDEditor
                  value={text}
                  onChange={(value) => setText(value)}
                  preview="edit"
                  onBlur={(event)=>{updateStep({...step, text: event.target.value}, index)}}
                />
                {false&&<TextField
                  variant='outlined'
                  label='Text'
                  defaultValue={step.text ?? ''}
                  fullWidth
                  multiline
                  onBlur={(event) => {updateStep({...step, text: event.target.value}, index)}}
                  />}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
      </Grid>)
}

const ImageStep = ({step, opacity, imageColorOptions, imageSideOptions, index, addStep, updateStep, removeStep, moveStep}) => {
    return(
      <Grid
        item
        xs={12}
        style={{
          display:'flex',
          justifyContent:'stretch',
          alignItems:'flex-start'
        }}
        >
           <Card style={{flexGrow:1, opacity}}>
            <CardHeader
              action={
                <IconButton aria-label="delete" onClick={()=>{removeStep(step)}}><DeleteIcon/></IconButton>
              }
              title={`Step ${step.displayOrder ?? index+1 }`}
              />
            <CardContent style={{paddingTop:0}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  label='Caption Heading'
                  defaultValue={step.title ?? ''}
                  fullWidth
                  onBlur={(event) => {updateStep({...step, title: event.target.value}, index)}}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  label='Caption Text'
                  defaultValue={step.text ?? ''}
                  fullWidth
                  multiline
                  onBlur={(event) => {updateStep({...step, text: event.target.value}, index)}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadFile imageUrl={step.imageUrl} onSuccess={({url}) => {updateStep({...step, imageUrl: url}, index)}}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant='outlined'
                    label='Image Alt Text'
                    defaultValue={step.altText ?? ''}
                    fullWidth
                    multiline
                    onBlur={(event) => {updateStep({...step, altText: event.target.value}, index)}}
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel>Image Color</InputLabel>
                    <Select
                      defaultValue={step.color ?? ''}
                      onChange={(event) => {updateStep({...step, color: event.target.value}, index)}}
                      >
                      {[null, ...imageColorOptions].map((opt) => {
                        return( <MenuItem value={opt}>{opt ?? '...'}</MenuItem>)
                      })}
                      </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl variant='outlined' fullWidth>
                      <InputLabel>Image Side</InputLabel>
                      <Select
                        defaultValue={step.side ?? ''}
                        onChange={(event) => {updateStep({...step, side: event.target.value}, index)}}
                        >
                        {[null, ...imageSideOptions].map((opt) => {
                          return( <MenuItem value={opt}>{opt ?? '...'}</MenuItem>)
                        })}
                        </Select>
                        </FormControl>
                      </Grid>
              </Grid>
            </CardContent>
          </Card>
      </Grid>)
}

const HeaderStep = ({step, opacity, index, addStep, updateStep, removeStep, moveStep}) => {
    return(
      <Grid
        item
        xs={12}
        style={{
          display:'flex',
          justifyContent:'stretch',
          alignItems:'flex-start'
        }}
        >
          <Card style={{flexGrow:1, opacity}}>
            <CardHeader
              action={
                <IconButton aria-label="delete" onClick={()=>{removeStep(step)}}><DeleteIcon/></IconButton>
              }
              title={`Section Header`}
              />
            <CardContent style={{paddingTop:0}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  label='Header'
                  defaultValue={step.title ?? ''}
                  fullWidth
                  onBlur={(event) => {updateStep({...step, title: event.target.value}, index)}}
                  />
              </Grid>
              </Grid>
            </CardContent>
          </Card>
      </Grid>)
}

export default StepCard;
