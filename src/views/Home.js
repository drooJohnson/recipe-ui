import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import RecipeCard from './components/RecipeCard'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import FeaturedRecipe from './recipe/FeaturedRecipe'

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

const FeaturedRecipes = styled.div`
  display:grid;
  grid-template-columns:repeat(12, 1fr);
  grid-template-rows: auto;
  column-gap:24px;
`

const Home = () => {
  const history = useHistory();
  const {loading, data, error, refetch, fetchMore} = useQuery(RECIPES, {variables: {pageSize: 3}});

  if (loading) return "Loading..."
  if (error) return `${error}`

  const featureProps = [
    {color:'teal',side:'LEFT'},
    {color:'yellow',side:'RIGHT'},
    {color:'purple',side:'LEFT'}
  ]

  return(
      <Grid container spacing={3}>
        <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
          <Typography variant="h4">Latest Recipes</Typography>
          <Button onClick={()=>{history.push('/recipes/')}}>VIEW MORE</Button>
        </Grid>
          {data.recipes.recipes.map((recipe, index) => {
            return(
              <Grid item xs={12}>
                <FeaturedRecipe recipe={recipe} {...featureProps[index]}/>
              </Grid>
            )
          })}
      </Grid>
  )
}

export default Home;
