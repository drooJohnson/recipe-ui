import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import RecipeDeleteConfirmationDialog from './components/RecipeDeleteConfirmationDialog';
import RecipeRestoreConfirmationDialog from './components/RecipeRestoreConfirmationDialog';
import { format, fromUnixTime, isValid } from 'date-fns';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const RECIPES = gql`
  query Recipes(
    $pageSize: Int,
    $page: Int,
    $after: String,
    $includeDeleted: Boolean,
  ){
    recipes(
      pageSize:$pageSize,
      page:$page,
      after:$after
      includeDeleted:$includeDeleted
    ){
      cursor,
      hasMore,
      pageCursors {
        first {
          page
          cursor
          isCurrent
        }
        last {
          page
          cursor
          isCurrent
        }
        next {
          page
          cursor
          isCurrent
        }
        previous {
          page
          cursor
          isCurrent
        }
        around {
          page
          cursor
          isCurrent
        }
      },
      totalItems,
      recipes {
        id,
        name,
        description,
        imageUrl,
        imageColor,
        imageAltText,
        ingredients,
        steps {
          id,
          displayOrder,
          text
        },
        tags {
          id,
          slug,
          text,
          kind
        },
        status,
        createdAt,
        updatedAt,
        deletedAt,
      }
    }
  }
`

const formatDate = (unixMillisecondsString) => {
  const unixSeconds = parseInt(unixMillisecondsString)/1000;
  const parsedDate = fromUnixTime(unixSeconds);
  return isValid(parsedDate) ? format(parsedDate, 'MM/dd/yyyy') : null;
}

const Admin = () => {
  const history = useHistory();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [includeDeleted, setIncludeDeleted] = useState(true);
  const {loading, data, error, refetch} = useQuery(RECIPES, {variables: {pageSize: rowsPerPage}});

  const getCursorForPage = (pageNumber) => {
    let {first, previous, around, next, last} = data.recipes.pageCursors;
    let cursors = [first, previous, ...around, next, last].filter(entry => entry != null);
    console.log(cursors);
    let cursorForPage = cursors.filter(cursor => cursor.page === pageNumber)[0];
    console.log(cursorForPage);
    return cursorForPage.cursor;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const cursor = getCursorForPage(newPage+1);
    refetch({
      pageSize:rowsPerPage,
      page:newPage+1,
      after:cursor
    })
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  }

  if (loading) return "Loading..."
  if (error) return `${error}`

  return(
    <>
    <Paper>
    <TableContainer component={Paper}>
      <Table aria-label='table'>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Modified</TableCell>
          <TableCell>Deleted</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align='right'>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.recipes.recipes.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{formatDate(row.createdAt) ?? '—'}</TableCell>
            <TableCell>{formatDate(row.updatedAt) ?? '—'}</TableCell>
            <TableCell>{formatDate(row.deletedAt) ?? '—'}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell align='right'>
              <IconButton size='small' style={{marginRight:'8px'}}><EditIcon fontSize='small'/></IconButton>
              {row.deletedAt ? <RecipeRestoreConfirmationDialog recipe={row}/> : <RecipeDeleteConfirmationDialog recipe={row}/> }
              <IconButton size='small'><VisibilityIcon fontSize='small'/></IconButton>
            </TableCell>
          </TableRow>
          )
        )}
      </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10,25,50]}
      component='div'
      count={data.recipes.totalItems}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    </Paper>
    </>
  )
}

export default Admin;
