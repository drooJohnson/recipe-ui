import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import TagInput from './TagInput'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IngredientsList from './IngredientsList';
import StepsList from './StepsList';
import UploadFile from '../UploadFile';
import MDEditor from '@uiw/react-md-editor';

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
        <Grid item xs={12}>
          <MDEditor
            id="recipe-description"
            value={description}
            onChange={(value) => setDescription(value)}
            onBlur={(event) => {dispatch({type: 'updateDescription', payload:event.target.value})}}
            />
        </Grid>
        <Grid item xs={12}>
          <UploadFile imageUrl={recipe.imageUrl} onSuccess={({url}) => {dispatch({type: 'updateImageUrl', payload:url})}}/>
        </Grid>
      </Grid>
        <IngredientsList ingredients={state.ingredients} updateIngredients={(newIngredients) => {dispatch({type: 'updateIngredients', payload:newIngredients})}}/>
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
