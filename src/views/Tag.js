import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import RecipeCard from './components/RecipeCard'

const TAG = gql`
  query Tag($id: ID!){
    tag(id: $id){
      id,
      slug,
      text,
      kind,
      imageUrl,
      recipes {
        id,
        name,
        description,
        imageUrl,
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
    <Grid container spacing={3}>
      <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <Typography variant="h4">All Recipes tagged {data.tag.text}</Typography>
        <Link to={`/tag/edit/${tagId}`}><Button>EDIT</Button></Link>
      </Grid>
      {data.tag.recipes.map(recipe => {
        return (
          <Grid item xs={12} sm={6} md={4} style={{display:'flex',justifyContent:'stretch',alignItems:'stretch'}}>
            <RecipeCard recipe={recipe}/>
        </Grid>
        )
      })}
    </Grid>
  )
}

export default Tag;
