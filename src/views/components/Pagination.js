import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const PaginationBar = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`

const Page = styled(Button)`
  border-radius:16px;
  font-weight:400;
  height:32px;
  margin: 0 3px;
  padding: 0 6px;
  min-width:32px;
  ${props => props.active && 'background-color:rgba(0,0,0,0.08);'}
`

const Ellipsis = styled.div`
  width:32px;
  text-align:center;
`

const Pagination = ({
  onClick, pageCursors
}) => {
  console.log(pageCursors);
  return(
    <PaginationBar>
      <Page disabled={!pageCursors.previous} onClick={()=>{onClick(pageCursors.previous?.page, pageCursors.previous?.cursor)}}><ChevronLeftIcon fontSize="small"/></Page>
      { pageCursors.first && (pageCursors.first.page !== pageCursors.around[0].page) &&
        <>
          <Page onClick={()=>{onClick(pageCursors.first.page, pageCursors.first.cursor)}} active={pageCursors.first.isCurrent}>{pageCursors.first.page}</Page>
          <Ellipsis>…</Ellipsis>
        </>
      }
      {pageCursors.around.map( page => {
        console.log(page);
        return <Page key={`page-${page.page}`} onClick={()=>{onClick(page.page, page.cursor)}} active={page.isCurrent}>{page.page}</Page>
      })}
      { pageCursors.last && (pageCursors.last.page !== pageCursors.around[pageCursors.around.length - 1].page) &&
        <>
          <Ellipsis>…</Ellipsis>
          <Page onClick={()=>{onClick(pageCursors.last.page, pageCursors.last.cursor)}} active={pageCursors.last.isCurrent}>{pageCursors.last.page}</Page>
        </>
      }
      <Page disabled={!pageCursors.next} onClick={()=>{onClick(pageCursors.next.page, pageCursors.next.cursor)}}><ChevronRightIcon fontSize="small"/></Page>
    </PaginationBar>
  )
}

export default Pagination;
