import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import RecipeForm from './forms/RecipeForm'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify';

const RECIPE = gql`
  query Recipe($slug: String!){
    recipe(slug: $slug){
      id,
      name,
      description,
      status,
      imageUrl,
      imageAltText,
      imageColor,
      ingredients,
      steps {
        id,
        displayOrder,
        title,
        text,
        type,
        imageUrl,
        side,
        color,
        altText
      },
      slug,
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
      status,
      imageUrl,
      imageAltText,
      imageColor,
      ingredients,
      steps {
        id,
        displayOrder,
        title,
        text,
        type,
        imageUrl,
        side,
        color,
        altText
      },
      slug
      tags {
        id,
        slug,
        text,
        kind
      }
    }
  }
`

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($recipeId: ID!){
    deleteRecipe(recipeId: $recipeId){
      id,
      name,
      description,
      status,
      imageUrl,
      ingredients,
      steps {
        id,
        displayOrder,
        title,
        text,
        type,
        imageUrl,
        side,
        color,
        altText
      },
      slug
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
  let { slug: recipeSlug } = useParams();
  const history = useHistory();
  const { loading, data, error } = useQuery(RECIPE, { variables: { slug: recipeSlug } });
  const [ updateRecipe, { error: updateError, loading: updateLoading }] = useMutation(UPDATE_RECIPE);
  const [ deleteRecipe, {/* error: deleteError, loading: deleteLoading */}] = useMutation(DELETE_RECIPE);
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
      status: recipe.status,
      imageUrl: recipe.imageUrl,
      imageAltText: recipe.imageAltText,
      imageColor: recipe.imageColor,
      ingredients: recipe.ingredients,
      steps: recipe.steps.map( step => stripProperties(['__typename','key','uiKey'],step) ),
      tags: recipe.tags.map( tag => stripProperties(['__typename','key','uiKey'],tag) )
    }

    updateRecipe({
      variables: {
        recipe: updateRecipeInput
      }
    })
      .then((res) => {
        toast.success('Recipe Saved!')
      })
      .catch((e) => {
        toast.error(`Recipe couldn't be saved. Error: ${e}`)
      });
  }

  const deleteRecipeHandler = () => {
    deleteRecipe({ variables: {recipeId: data.recipeBySlug.id} })
    .then((res) => {
      toast.success('Recipe Deleted, returning to recipes...', {onClose: ()=>{history.push(`/recipes`)}})
    })
    .catch((e) => {
      toast.error(`Recipe couldn't be deleted. Error: ${e}`)
    })
  }

  if (loading) return "Loading..."
  if (error) return `${error}`

  return(
    <>
      <h1>Edit Recipe</h1>
      <RecipeForm onSubmit={submitRecipe} recipe={data.recipeBySlug} loading={updateLoading} error={updateError}/>
      <Button onClick={()=>{deleteRecipeHandler()}}>Delete Recipe</Button>
    </>
  )
}

export default RecipeEdit;
