import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FeaturedRecipe from './recipe/FeaturedRecipe'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

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
        imageColor,
        imageAltText,
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
        },
        slug,
        createdAt,
        updatedAt
      }
    }
  }
`

const Home = () => {
  const history = useHistory();
  const {loading, data, error} = useQuery(RECIPES, {variables: {pageSize: 3}});

  if (loading) return "Loading..."
  if (error) return `${error}`

  const colors = ['MAGENTA','CYAN','YELLOW'];

  return(
      <Grid container spacing={3}>
          {data.recipes.recipes.map((recipe, index) => {
            return(
              <Grid item xs={12}>
                <FeaturedRecipe recipe={recipe} side={( index % 2 === 0) ? 'LEFT' : 'RIGHT'} color={colors[index]}/>
              </Grid>
            )
          })}
          <Grid item xs={12} style={{textAlign:'right'}}>
            <Button endIcon={<ArrowForwardIcon/>} onClick={()=>{history.push('/recipes')}} variant="contained">More Recipes</Button>
          </Grid>
      </Grid>
  )
}

export default Home;
