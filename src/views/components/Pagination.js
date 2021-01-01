import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const PaginationBar = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:16px;
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
  let {first, previous, around, next, last} = pageCursors;

  const displayFirst = (first && (first.page !== around[0].page));
  const displayLast = (last && (last.page !== around[around.length - 1].page));

  return(
    <PaginationBar>
      <Page
        disabled={!previous}
        onClick={()=>{ onClick(previous?.page, previous?.cursor) }}
      >
        <ChevronLeftIcon fontSize="small"/>
      </Page>
      { displayFirst &&
        <>
          <Page
            onClick={()=>{onClick(first.page, first.cursor)}}
            active={first.isCurrent}
          >
            {first.page}
          </Page>
          <Ellipsis>…</Ellipsis>
        </>
      }
      {around.map( page => {
        return (
          <Page
            key={`page-${page.page}`}
            onClick={()=>{onClick(page.page, page.cursor)}}
            active={page.isCurrent}
          >
            {page.page}
          </Page>
        )
      })}
      { displayLast &&
        <>
          <Ellipsis>…</Ellipsis>
          <Page
            onClick={()=>{onClick(last.page, last.cursor)}}
            active={last.isCurrent}
          >
            {last.page}
          </Page>
        </>
      }
      <Page
        disabled={!next}
        onClick={()=>{onClick(next.page, next.cursor)}}
      >
        <ChevronRightIcon fontSize="small"/>
      </Page>
    </PaginationBar>
  )
}

export default Pagination;
