import React from 'react';
import styled from 'styled-components';

const PaginationBar = styled.div`
  display:flex;
  background-color:pink;
`

const Page = styled.div`
  font-weight:bold;
  background-color:red;
  color:white;
`

const Pagination = ({
  onClick, pageCursors
}) => {
  console.log(pageCursors);
  return(
    <PaginationBar>
    {pageCursors.first &&
      <>
        <Page onClick={()=>{onClick(pageCursors.first.page, pageCursors.first.cursor)}}>{pageCursors.first.page}</Page>
        <div>...</div>
      </>
    }
    {pageCursors.around.map( page => {
      return <Page onClick={()=>{onClick(page.page, page.cursor)}}>{page.page}</Page>
    })}
    {pageCursors.last &&
      <>
        <div>...</div>
        <Page onClick={()=>{onClick(pageCursors.last.page, pageCursors.last.cursor)}}>{pageCursors.last.page}</Page>
      </>
    }
    </PaginationBar>
  )
}

export default Pagination;
