import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
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

const TagChip = styled.div`
  display:block;
  margin:4px;
  background-color:pink;
`

const TagChipRow = styled.div`
  display:flex;
  justify-content:flex-start;
  flex-wrap:wrap;
`

const Tags = () => {
  const { loading, data, error } = useQuery(TAGS);

  if (loading) return "Loading..."
  if (error) return `${error}`

  // sort tags by KIND
  const groupedTags = _.groupBy(data.tags, 'kind');

  return(
    <>
      <h1>All Tags</h1>
        {Object.entries(groupedTags).map(([key,value]) => {
          return (
            <>
              <TagKind key={key}>{key}</TagKind>
              <GridList>
                {value.map(tag => {
                  return (
                    <GridListTile key={tag.id}>
                      <img src={tag.imageUrl}/>
                      <GridListTileBar title={tag.text}>
                        <Link to={`/tag/${tag.id}`}>
                        {tag.text}
                        </Link>
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
