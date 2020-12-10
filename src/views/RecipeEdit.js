import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import RecipeForm from './forms/RecipeForm'

const RECIPE = gql`
  query Recipe($id: ID!){
    recipe(id: $id){
      id,
      name,
      description,
      imageUrl,
      ingredients {
        id,
        displayOrder,
        quantity,
        unit,
        name
      },
      steps {
        id,
        displayOrder,
        title,
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

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipe: UpdateRecipeInput!){
    updateRecipe(recipe: $recipe){
      id,
      name,
      description,
      imageUrl,
      ingredients {
        id,
        displayOrder,
        quantity,
        unit,
        name
      },
      steps {
        id,
        displayOrder,
        title,
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

const RecipeEdit = () => {
  let { id: recipeId } = useParams();
  const { loading, data, error } = useQuery(RECIPE, { variables: { id: recipeId } });
  const [ updateRecipe, { error: updateError, loading: updateLoading }] = useMutation(UPDATE_RECIPE);
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
    let updateRecipeInput = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      ingredients: recipe.ingredients.map( ingredient => stripProperties(['__typename','key','uiKey'],ingredient) ),
      steps: recipe.steps.map( step => stripProperties(['__typename','key','uiKey'],step) ),
      tags: recipe.tags.map( tag => stripProperties(['__typename','key','uiKey'],tag) )
    }

    updateRecipe({
      variables: {
        recipe: updateRecipeInput
      }
    }).then(res => console.log(res)).catch(e => console.log(e));
  }

  if (loading) return "Loading..."
  if (error) return `${error}`

  return(
    <>
      <h1>Edit Recipe</h1>
      <RecipeForm onSubmit={submitRecipe} recipe={data.recipe} loading={updateLoading} error={updateError}/>
    </>
  )
}

export default RecipeEdit;
