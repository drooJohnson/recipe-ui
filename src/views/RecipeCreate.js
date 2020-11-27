import React from 'react';
import { gql, useMutation } from '@apollo/client'
import { useHistory, Link } from 'react-router-dom'
import RecipeForm from './forms/RecipeForm'

const CREATE_RECIPE = gql`
  mutation InsertRecipe($recipe: CreateRecipeInput!){
    insertRecipe(recipe: $recipe){
      id,
      name,
      description
      ingredients {
        id,
        sectionName,
        displayOrder,
        quantity,
        unit,
        name
      },
      steps {
        id,
        sectionName,
        displayOrder,
        numberOverride,
        text
      },
      tags {
        id,
        slug,
        text,
        kind
      }
    }
  }
`

const RecipeCreate = () => {
  const history = useHistory();
  const [ createRecipe, { data, error, loading }] = useMutation(CREATE_RECIPE,
    {
      onCompleted: (data) => {
      console.log("ONCOMPLETED",data);
      history.push(`/recipe/${data.insertRecipe.id}`)
    }
  });
  // After successful submission, redirect user to the EDIT route, using the
  // id that the CREATE_RECIPE mutation should return.
  const stripProperties = (propertiesArray, obj) => {
    var rawObj = {...obj};
    propertiesArray.map((propToRemove) => {
      delete rawObj[propToRemove]
    })
    return rawObj;
  }
  const stripTypeName = (obj) => {
    const {__typename, ...rest} = obj;
    return rest;
  }

  const submitRecipe = (recipe) => {
    let createRecipeInput = {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients.map( ingredient => stripProperties(['__typename','key'],ingredient) ),
      steps: recipe.steps.map( step => stripProperties(['__typename','key'],step) ),
      tags: recipe.tags.map( tag => stripProperties(['__typename','key'],tag) )
    }

    createRecipe({
      variables: {
        recipe: createRecipeInput
      }
    }).then(res => console.log(res)).catch(e => console.log(e));
  }

  return(
    <>
      <h1>New Recipe</h1>
      <RecipeForm onSubmit={submitRecipe} loading={loading} error={error}/>
    </>
  )
}

export default RecipeCreate;
