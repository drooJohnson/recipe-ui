import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import Pagination from './components/Pagination'
import MPagination from '@material-ui/lab/Pagination'
import RecipeCard from './components/RecipeCard'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
        next {
          page
          cursor
          isCurrent
        }
        previous {
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
  }
`


const Recipes = () => {
  const history = useHistory();
  const {loading, data, error, refetch, fetchMore} = useQuery(RECIPES, {variables: {pageSize: 4}});
  if (loading) return "Loading..."
  if (error) return `${error}`


  const changePage = (page,cursor) => {
    refetch({
      page: page,
      after: cursor
    })
  }

  const currentPage = () => {
    let cursors = data.recipes.pageCursors.around;
    return cursors.filter(cursor => (cursor.isCurrent)).page;
  }

  return(
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <Typography variant="h4">All Recipes</Typography>
      </Grid>
      {data.recipes.recipes.map(recipe => {
        return(
          <Grid item xs={12} sm={6} md={4} style={{display:'flex',justifyContent:'stretch',alignItems:'stretch'}}><RecipeCard recipe={recipe}/></Grid>
        )
      })}
      <Grid item xs={12}>
        <Pagination
          pageCursors={data.recipes.pageCursors}
          onClick={changePage}
          />
      </Grid>
    </Grid>
    </>
  )
}

export default Recipes;
