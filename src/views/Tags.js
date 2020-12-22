import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as _ from 'lodash'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const TAGS = gql`
  query Tags{
    tags{
      id,
      slug,
      text,
      kind,
      imageUrl,
      recipes (first:4) {
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

const TagKind = styled.h2`
  text-transform:capitalize;
`

const Tags = () => {
  const { loading, data, error } = useQuery(TAGS);
  const history = useHistory();

  if (loading) return "Loading..."
  if (error) return `${error}`

  // sort tags by KIND
  const withoutEmptyTags = data.tags.filter(tag => tag.recipes.length > 0);
  const groupedTags = _.groupBy(withoutEmptyTags, 'kind');
  //const withoutEmptyGroups = groupedTags.filter(group => group.length > 0);

  return(
    <>
      <h1>All Tags</h1>
        {Object.entries(groupedTags).map(([key,value]) => {
          return (
            <>
              <TagKind key={key}>{key.toLowerCase()}</TagKind>
              <GridList>
                {value.map(tag => {
                  if (tag.recipes.length < 1) return;
                  return (
                    <GridListTile style={{cursor:'pointer'}} key={tag.id} onClick={()=>{history.push(`/tag/${tag.id}`)}}>
                        <img src={tag.imageUrl}/>
                        <GridListTileBar title={tag.text}>
                          {tag.text}
                        </GridListTileBar>
                    </GridListTile>
                  )
                })}
              </GridList>
            </>
          )
        })}
    </>
  )
}

export default Tags;
