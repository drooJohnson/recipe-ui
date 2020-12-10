import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const PaginationBar = styled.div`
  display:flex;
  background-color:pink;
`

const Page = styled(Button)`
  border-radius:16px;
  height:32px;
  margin: 0 3px;
  padding: 0 6px;
  min-width:32px;
`

const Pagination = ({
  onClick, pageCursors
}) => {
  console.log(pageCursors);
  return(
    <PaginationBar>
      <Page disabled={!pageCursors.previous} onClick={()=>{onClick(pageCursors.previous?.page, pageCursors.previous?.cursor)}}><ChevronLeftIcon/></Page>
      { pageCursors.first && (pageCursors.first.page !== pageCursors.around[0].page) &&
        <>
          <Page onClick={()=>{onClick(pageCursors.first.page, pageCursors.first.cursor)}}>{pageCursors.first.page}</Page>
          <div>...</div>
        </>
      }
      {pageCursors.around.map( page => {
        return <Page key={`page-${page.page}`} onClick={()=>{onClick(page.page, page.cursor)}}>{page.page}</Page>
      })}
      { pageCursors.last && (pageCursors.last.page !== pageCursors.around[pageCursors.around.length - 1].page) &&
        <>
          <div>...</div>
          <Page onClick={()=>{onClick(pageCursors.last.page, pageCursors.last.cursor)}}>{pageCursors.last.page}</Page>
        </>
      }
      <Page disabled={!pageCursors.next} onClick={()=>{onClick(pageCursors.next.page, pageCursors.next.cursor)}}><ChevronRightIcon/></Page>
    </PaginationBar>
  )
}

export default Pagination;
