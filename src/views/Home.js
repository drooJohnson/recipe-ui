import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import Pagination from './components/Pagination'

const ALL_RECIPES = gql`
  query AllRecipes{
    allRecipes{
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

const RECIPES = gql`
  query Recipes(
    $pageSize: Int,
    $page: Int,
    $after: String
  ){
    recipes(
      pageSize:$pageSize,
      page:$page,
      after:$after
    ){
      cursor,
      hasMore,
      pageCursors {
        first {
          page
          cursor
          isCurrent
        }
        last {
          page
          cursor
          isCurrent
        }
        around {
          page
          cursor
          isCurrent
        }
      },
      recipes {
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
  }
`


const Home = () => {
  const {loading, data, error, refetch, fetchMore} = useQuery(RECIPES, {variables: {pageSize: 5}});
  if (loading) return "Loading..."
  if (error) return `${error}`


  const changePage = (page,cursor) => {
    console.log(page,cursor);
    refetch({
      pageSize: 5,
      page: page,
      after: cursor
    })
  }

  return(
    <div>
      {data.recipes.recipes.map(recipe => {
        return(
          <div>
            <Link to={`/recipe/${recipe.id}`}><h1>{recipe.name}</h1></Link>
            <p>{recipe.description}</p>
            <div>
            {recipe.tags?.map(tag => {
              return <Link to={`/tag/${tag.id}`}>{tag.text}</Link>
            })}
            </div>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients?.map(ingredient => {
                return <li>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
              })}
            </ul>
            <h3>Method</h3>
            <ol>
              {recipe.steps?.map(step => {
                return <li>{step.text}</li>
              })}
            </ol>
          </div>
        )
      })}
      <Pagination
        pageCursors={data.recipes.pageCursors}
        onClick={changePage}
        />
      <button onClick={async () => {
          await fetchMore({
            variables: {
              after:data.recipes.cursor
            }
          })
        }}
        >Load More</button>
    </div>
  )
}

export default Home;
