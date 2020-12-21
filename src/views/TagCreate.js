import React from 'react';
import { gql, useMutation } from '@apollo/client'
import TagForm from './forms/TagForm'

const INSERT_TAG = gql`
 mutation InsertTag(
   $tag: InsertTagInput!
 ) {
   insertTag(
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

const TagCreate = () => {
  const [ insertTag, { loading, error }] = useMutation(INSERT_TAG);
  if (loading) return "Loading..."
  if (error) return `${error}`

  const submitTag = (tag) => {
    let insertTagInput = {
      slug: tag.slug,
      text: tag.text,
      imageUrl: tag.imageUrl,
      kind: tag.kind
    }

    insertTag({
      variables: {
        tag: insertTagInput
      }
    }).then(res => console.log(res)).catch(e => console.log(e));
  }

  return(
    <>
      <h1>New Tag</h1>
      <TagForm onSubmit={submitTag} loading={loading} error={error}/>
    </>
  )
}

export default TagCreate;
