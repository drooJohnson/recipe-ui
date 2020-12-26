import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import TagInput from './TagInput'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StepsList from './StepsList';
import UploadFile from '../UploadFile';
import { useEnumValues } from '../../utils/useEnumValues';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



// ARRAY INPUTS - Tags/Ingredients/Steps - currently only equipped to handle
// "key" values for NEW entries.

const recipeReducer = (state, action) => {
  //console.log(`recipeReducer called with action.type of ${action.type}`)
  switch (action.type) {
    case 'updateDescription':
      return {...state, description: action.payload}
    case 'updateName':
      return {...state, name: action.payload}
    case 'updateImageUrl':
      return {...state, imageUrl: action.payload}
    case 'updateImageAltText':
      return {...state, imageAltText: action.payload}
    case 'updateImageColor':
      return {...state, imageColor: action.payload}
    case 'updateTags':
      return {...state, tags: action.payload}
    case 'updateSteps':
      return {...state, steps: action.payload}
    case 'updateIngredients':
      return {...state, ingredients: action.payload}
    case 'updateRecipe':
      return {...state, ...action.payload}
    default:
      throw new Error();
  }
}

const RecipeForm = ({onSubmit, loading, error, recipe}) => {
  const [state, dispatch] = useReducer(recipeReducer, recipe);

  const [description, setDescription] = useState(recipe.description);
  const [imageAltText, setImageAltText] = useState(recipe.imageAltText);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  const {data:imageColorOptions} = useEnumValues("ImageColor");

  return (
    <form noValidate autoComplete='off'>
      <Grid container spacing={2} style={{marginBottom:'24px'}}>
        <Grid item xs={12}>
          <TextField
            id="recipe-name"
            label="Name"
            variant='outlined'
            value={state.name ?? ''}
            fullWidth
            onChange={(event) => {dispatch({type: 'updateName', payload:event.target.value})}}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadFile imageUrl={recipe.imageUrl} onSuccess={({url}) => {dispatch({type: 'updateImageUrl', payload:url})}}/>
        </Grid>

        <Grid container item xs={12} sm={6} style={{flexDirection: 'column'}}>
            <FormControl fullWidth style={{paddingBottom:'16px'}}>
              <InputLabel>Image Color</InputLabel>
              <Select
                defaultValue={recipe.imageColor ?? ''}
                onChange={(event) => {dispatch({type: 'updateImageColor', payload: event.target.value})}}
                >
                {[null, ...imageColorOptions].map((opt) => {
                  return( <MenuItem value={opt}>{opt ?? '...'}</MenuItem>)
                })}
                </Select>
              </FormControl>
                <TextField
                  id="recipe-image-alt-text"
                  label="Image Alt Text"
                  variant='outlined'
                  value={imageAltText ?? ''}
                  multiline
                  fullWidth
                  onChange={(event) => {setImageAltText(event.target.value)}}
                  onBlur={(event) => {dispatch({type: 'updateImageAltText', payload:event.target.value})}}
                  />
        </Grid>
        <Grid item xs={12}><Typography variant='h5'>Description</Typography></Grid>
        <Grid item xs={12}>
          <TextField
            id="recipe-description"
            label="Description"
            variant='outlined'
            value={description ?? ''}
            multiline
            fullWidth
            onChange={(event) => {setDescription(event.target.value)}}
            onBlur={(event) => {dispatch({type: 'updateDescription', payload:event.target.value})}}
            />
        </Grid>
        <Grid item xs={12}><Typography variant='h5'>Ingredients</Typography></Grid>
        <Grid item xs={12}>
          <TextField
          id="recipe-ingredients"
          label="Ingredients"
          variant='outlined'
          value={ingredients ?? ''}
          multiline
          fullWidth
          onChange={(event) => {setIngredients(event.target.value)}}
          onBlur={(event) => {dispatch({type: 'updateIngredients', payload:event.target.value})}}
          />
        </Grid>
      </Grid>

        <StepsList steps={state.steps} updateSteps={(newSteps) => {dispatch({type: 'updateSteps', payload:newSteps})}}/>
        <TagInput tags={state.tags} onInsertTag={(newTag)=>{dispatch({type: 'updateTags', payload:[...state.tags, newTag]})}} onChange={(newTags) => {dispatch({type: 'updateTags', payload:newTags})}}/>

      <Button type='button' onClick={()=>{onSubmit(state)}}>SUBMIT</Button>
    </form>
  )
}

RecipeForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  recipe: PropTypes.object
}

RecipeForm.defaultProps = {
  recipe: {
    name: '',
    description: '',
    imageUrl: '',
    steps: [],
    ingredients: [],
    tags: []
  }
}

export default RecipeForm;
