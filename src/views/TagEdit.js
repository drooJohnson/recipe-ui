import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import TagForm from './forms/TagForm'

const TAG = gql`
  query Tag($id: ID!){
    tag(id: $id){
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

const UPDATE_TAG = gql`
 mutation UpdateTag(
   $tag: UpdateTagInput!
 ) {
   updateTag(
     tag: $tag
   ) {
     id
     slug
     text
     imageUrl
     kind
   }
 }
`

const TagEdit = () => {

  let { id: tagId } = useParams();
  const { loading, data, error } = useQuery(TAG, { variables: { id: tagId } });

  const [ updateTag, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TAG);

  if (loading) return "Loading..."
  if (error) return `${error}`

  const submitTag = (tag) => {
    let updateTagInput = {
      id: tag.id,
      slug: tag.slug,
      text: tag.text,
      imageUrl: tag.imageUrl,
      kind: tag.kind
    }

    updateTag({
      variables: {
        tag: updateTagInput
      }
    }).then(res => console.log(res)).catch(e => console.log(e));
  }

  return(
    <>
      <h1>Editing {data.tag.text}</h1>
      <TagForm onSubmit={submitTag} loading={loading || updateLoading} error={error || updateError} tag={data.tag}/>
    </>
  )
}

export default TagEdit;
