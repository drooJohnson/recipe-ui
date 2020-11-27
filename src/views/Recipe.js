import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

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

const Recipe = () => {
  let { id: recipeId } = useParams();
  const { loading, data, error } = useQuery(RECIPE, { variables: { id: recipeId } });

  if (loading) return "Loading..."
  if (error) return `${error}`

  const {id, name, description, ingredients, steps, tags} = data.recipe;

  return(
    <>
      <Link to={`/recipe/edit/${id}`}>EDIT</Link>
      <h1>{name}</h1>
      <p>{description}</p>
      <div>
      {tags?.map(tag => {
        return <Link as="span" to={`/tag/${tag.id}`}>{tag.text}</Link>
      })}
      </div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients?.map(ingredient => {
          return <li>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
        })}
      </ul>
      <h3>Method</h3>
      <ol>
        {steps?.map(step => {
          return <li>{step.text}</li>
        })}
      </ol>
    </>
  )
}

export default Recipe;
