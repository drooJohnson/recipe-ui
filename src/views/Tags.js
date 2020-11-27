import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const TAGS = gql`
  query Tags{
    tags{
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

const Tags = () => {
  const { loading, data, error } = useQuery(TAGS);

  if (loading) return "Loading..."
  if (error) return `${error}`

  return(
    <>
    <h1>All Tags</h1>
    <ul>
      {data.tags.map(tag => {
        return (
          <Link to={`/tag/${tag.id}`}>
          <h3>{tag.text}</h3>
          </Link>
        )
      })}
    </ul>
    </>
  )
}

export default Tags;
