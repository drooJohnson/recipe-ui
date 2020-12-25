import React from 'react';
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import RecipeForm from './forms/RecipeForm'

const CREATE_RECIPE = gql`
  mutation InsertRecipe($recipe: CreateRecipeInput!){
    insertRecipe(recipe: $recipe){
      id,
      name,
      description,
      imageUrl,
      imageAltText,
      imageColor,
      ingredients,
      steps {
        id,
        displayOrder,
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
  const [ createRecipe, { error, loading }] = useMutation(CREATE_RECIPE,
    {
      onCompleted: (data) => {
      history.push(`/recipe/${data.insertRecipe.id}`)
    }
  });
  // After successful submission, redirect user to the EDIT route, using the
  // id that the CREATE_RECIPE mutation should return.
  const stripProperties = (propertiesArray, obj) => {
    var rawObj = {...obj};
    propertiesArray.map((propToRemove) => {
      delete rawObj[propToRemove]
      return null;
    })
    return rawObj;
  }

  const submitRecipe = (recipe) => {
    let createRecipeInput = {
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      imageAltText: recipe.imageAltText,
      imageColor: recipe.imageColor,
      ingredients: recipe.ingredients,
      steps: recipe.steps.map( step => stripProperties(['__typename','key','uiKey'],step) ),
      tags: recipe.tags.map( tag => stripProperties(['__typename','key','uiKey'],tag) )
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
