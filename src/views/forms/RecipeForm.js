import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import TagInput from './TagInput'

// ARRAY INPUTS - Tags/Ingredients/Steps - currently only equipped to handle
// "key" values for NEW entries.

const recipeReducer = (state, action) => {
  console.log(state,action);
  switch (action.type) {
    case 'updateDescription':
      return {...state, description: action.payload}
    case 'updateName':
      return {...state, name: action.payload}
    case 'updateTags':
      console.log("Updating Tags");
      console.log(action.payload);
      return {...state, tags: action.payload}
    case 'updateSteps':
      return {...state, steps: action.payload}
    case 'updateIngredients':
      return {...state, ingredients: action.payload}
    default:
      throw new Error();
  }
}

const Tags = ({updateTags, tags}) => {
  /*const addTag = () => {
    let newTag = {quantity:null, unit:null, name:null, key:`new-${ingredients.length+1}`};
    // auto-assign a key since this ingredient won't have a DB ID to use as one
    updateTags([...ingredients, newTag]);
  }

  const updateTag = (ingredient,index) => {
    var newTags = [...ingredients];
    newTags[index] = {...ingredient};
    updateTags(newTags);
  }

  const removeTag = (index) => {
    var newTags = [...ingredients];
    newTags.splice(index, 1);
    updateTags(newTags);
  }

  return (
    <>
    {ingredients.map((ingredient,index) => {
      return(
        <div key={ingredient.id ?? ingredient.key}>
          <TextField
            label='Quantity'
            value={ingredient.quantity ?? ''}
            onChange={(event) => {updateTag({...ingredient, quantity: event.target.value}, index)}}
            />
          <TextField
            label='Unit'
            value={ingredient.unit ?? ''}
            onChange={(event) => {updateTag({...ingredient, unit: event.target.value}, index)}}
            />
          <TextField
            label='Name'
            value={ingredient.name ?? ''}
            onChange={(event) => {updateTag({...ingredient, name: event.target.value}, index)}}
            />
          <button type='button' onClick={()=>{removeTag(index)}}>X</button>
        </div>
      )
    })}
    <button type='button' onClick={addTag}>New Ingredient</button>
    </>
  )*/

  return(
    <div>TAGS</div>
  )
}

const Ingredients = ({updateIngredients, ingredients}) => {
  const addIngredient = () => {
    let newIngredient = {quantity:null, unit:null, name:null, key:`new-${ingredients.length+1}`};
    // auto-assign a key since this ingredient won't have a DB ID to use as one
    updateIngredients([...ingredients, newIngredient]);
  }

  const updateIngredient = (ingredient,index) => {
    var newIngredients = [...ingredients];
    newIngredients[index] = {...ingredient};
    updateIngredients(newIngredients);
  }

  const removeIngredient = (index) => {
    var newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    updateIngredients(newIngredients);
  }

  return (
    <>
    <h3>Ingredients</h3>
    {ingredients.map((ingredient,index) => {
      return(
        <div key={ingredient.id ?? ingredient.key}>
          <TextField
            label='Quantity'
            value={ingredient.quantity ?? ''}
            onChange={(event) => {updateIngredient({...ingredient, quantity: event.target.value}, index)}}
            />
          <TextField
            label='Unit'
            value={ingredient.unit ?? ''}
            onChange={(event) => {updateIngredient({...ingredient, unit: event.target.value}, index)}}
            />
          <TextField
            label='Name'
            value={ingredient.name ?? ''}
            onChange={(event) => {updateIngredient({...ingredient, name: event.target.value}, index)}}
            />
          <button type='button' onClick={()=>{removeIngredient(index)}}>X</button>
        </div>
      )
    })}
    <button type='button' onClick={addIngredient}>New Ingredient</button>
    </>
  )
}

const Steps = ({updateSteps, steps}) => {
  const addStep = () => {
    let newStep = {text:null, key:`new-${steps.length+1}`};
    // auto-assign a key since this step won't have a DB ID to use as one
    updateSteps([...steps, newStep]);
  }

  const updateStep = (step,index) => {
    var newSteps = [...steps];
    newSteps[index] = {...step};
    updateSteps(newSteps);
  }

  const removeStep = (index) => {
    var newSteps = [...steps];
    newSteps.splice(index, 1);
    updateSteps(newSteps);
  }

  return (
    <>
    <h3>Steps</h3>
    {steps.map((step,index) => {
      return(
        <div key={step.id ?? step.key}>
          <h3>{index+1}</h3>
          <TextField
            label='Text'
            value={step.text ?? ''}
            onChange={(event) => {updateStep({...step, text: event.target.value}, index)}}
            />
          <button type='button' onClick={()=>{removeStep(index)}}>X</button>
        </div>
      )
    })}
    <button type='button' onClick={addStep}>New Step</button>
    </>
  )
}

const RecipeForm = ({onSubmit, loading, error, recipe}) => {
  const [state, dispatch] = useReducer(recipeReducer, recipe);
  return (
    <form noValidate autoComplete='off'>
      <div>
        <TextField
          id="recipe-name"
          label="Name"
          value={state.name ?? ''}
          onChange={(event) => {dispatch({type: 'updateName', payload:event.target.value})}}
          />
        <TextField
          id="recipe-description"
          label="Description"
          value={state.description ?? ''}
          onChange={(event) => {dispatch({type: 'updateDescription', payload:event.target.value})}}
          />
        <Ingredients ingredients={state.ingredients} updateIngredients={(newIngredients) => {dispatch({type: 'updateIngredients', payload:newIngredients})}}/>
        <Steps steps={state.steps} updateSteps={(newSteps) => {dispatch({type: 'updateSteps', payload:newSteps})}}/>
        <TagInput tags={state.tags} onChange={(newTags) => {dispatch({type: 'updateTags', payload:newTags})}}/>
      </div>
      <button type='button' onClick={()=>{onSubmit(state)}}>SUBMIT</button>
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
    steps: [],
    ingredients: [],
    tags: []
  }
}

export default RecipeForm;
