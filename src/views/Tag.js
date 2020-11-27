import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const TAG = gql`
  query Tag($id: ID!){
    tag(id: $id){
      id,
      slug,
      text,
      kind,
      recipes {
        id,
        name,
        description
        tags {
          id,
          slug,
          text,
          kind
        }
      }
    }
  }
`

const Tag = () => {
  let { id: tagId } = useParams();
  const { loading, data, error } = useQuery(TAG, { variables: { id: tagId } });

  if (loading) return "Loading..."
  if (error) return `${error}`

  return(
    <>
    <h1>All Recipes tagged {data.tag.text}</h1>
    <ul>
      {data.tag.recipes.map(recipe => {
        return (
          <Link as="li" to={`/recipe/${recipe.id}`}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </Link>
        )
      })}
    </ul>
    </>
  )
}

export default Tag;
