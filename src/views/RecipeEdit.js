import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import RecipeForm from './forms/RecipeForm'

const RECIPE = gql`
  query Recipe($id: ID!){
    recipe(id: $id){
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

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipe: UpdateRecipeInput!){
    updateRecipe(recipe: $recipe){
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

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function stripTypeName(obj) {
  let {__typename, ...data} = obj;
  return data;
}

const RecipeEdit = () => {
  let { id: recipeId } = useParams();
  const { loading, data, error } = useQuery(RECIPE, { variables: { id: recipeId } });
  const [ updateRecipe, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_RECIPE);
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
    let updateRecipeInput = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients.map( ingredient => stripProperties(['__typename','key'],ingredient) ),
      steps: recipe.steps.map( step => stripProperties(['__typename','key'],step) ),
      tags: recipe.tags.map( tag => stripProperties(['__typename','key'],tag) )
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
