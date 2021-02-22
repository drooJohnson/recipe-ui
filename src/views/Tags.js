import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as _ from 'lodash'
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { device } from "../utils/device";

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

const TagKind = styled.h2`
  text-transform:capitalize;
`

const Tags = () => {
  const { loading, data, error } = useQuery(TAGS);
  const history = useHistory();
  const mobile = useMediaQuery(`${device.mobile}`);

  if (loading) return "Loading..."
  if (error) return `${error}`

  // sort tags by KIND
  const withoutEmptyTags = data.tags.filter(tag => tag.recipes.length > 0);
  const groupedTags = _.groupBy(withoutEmptyTags, 'kind');
  //const withoutEmptyGroups = groupedTags.filter(group => group.length > 0);

  return(
    <>
      <Typography gutterBottom variant="h4">Recipes by Tag</Typography>
        {Object.entries(groupedTags).map(([key,value]) => {
          return (
            <>
              <TagKind key={key}>{key.toLowerCase()}</TagKind>
              <GridList cols={mobile ? 1 : 3}>
                {value.map(tag => {
                  if (tag.recipes.length < 1) return;
                  return (
                    <GridListTile style={{cursor:'pointer'}} key={tag.id} onClick={()=>{history.push(`/tag/${tag.id}`)}}>
                        <img src={tag.imageUrl ?? tag.recipes[0].imageUrl}/>
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
