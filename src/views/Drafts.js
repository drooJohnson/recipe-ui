import React from 'react';
import { gql, useQuery } from '@apollo/client'
import Pagination from './components/Pagination'
import RecipeCard from './components/RecipeCard'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const RECIPES = gql`
  query Recipes(
    $pageSize: Int,
    $page: Int,
    $after: String,
  ){
    recipes(
      pageSize:$pageSize,
      page:$page,
      after:$after,
      status:DRAFT
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


const Drafts = () => {
  const {loading, data, error, refetch} = useQuery(RECIPES, {variables: {pageSize: 20}});
  if (loading) return "Loading..."
  if (error) return `${error}`


  const changePage = (page,cursor) => {
    refetch({
      page: page,
      after: cursor
    })
  }

  return(
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <Typography variant="h4">All Drafts</Typography>
      </Grid>
      {data.recipes.recipes.map(recipe => {
        return(
          <Grid item xs={12} sm={6} md={3} style={{display:'flex',justifyContent:'stretch',alignItems:'stretch'}}>
            <RecipeCard recipe={recipe}/>
          </Grid>
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

export default Drafts;
