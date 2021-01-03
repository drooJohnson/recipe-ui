import React, {useState, useEffect} from 'react';
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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const RECIPES = gql`
  query Recipes(
    $pageSize: Int,
    $page: Int,
    $after: String,
    $orderBy: RecipeOrderBy,
    $order: Order,
    $includeDeleted: Boolean,
  ){
    adminRecipes(
      pageSize: $pageSize,
      page: $page,
      after: $after,
      orderBy: $orderBy,
      order: $order,
      includeDeleted: $includeDeleted
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

const columns = [
  {name: 'Name', key: 'name', sortable: true},
  {name: 'Created', key: 'createdAt', sortable: true},
  {name: 'Updated', key: 'updatedAt', sortable: true},
  {name: 'Deleted', key: 'deletedAt', sortable: true},
  {name: 'Status', key: 'status', sortable: true}
]

const formatDate = (unixMillisecondsString) => {
  const unixSeconds = parseInt(unixMillisecondsString)/1000;
  const parsedDate = fromUnixTime(unixSeconds);
  return isValid(parsedDate) ? format(parsedDate, 'MM/dd/yyyy') : null;
}

const Admin = () => {
  const history = useHistory();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('updatedAt');
  const [order, setOrder] = useState('desc');
  const [includeDeleted, setIncludeDeleted] = useState(true);

  const {loading, data, error, refetch} = useQuery(RECIPES, {variables: {
    pageSize: rowsPerPage,
    page: 0,
    orderBy: orderBy,
    order: order.toUpperCase(),
    includeDeleted: includeDeleted
  }});

  const getCursorForPage = (pageNumber) => {
    let {first, previous, around, next, last} = data.adminRecipes.pageCursors;
    let cursors = [first, previous, ...around, next, last].filter(entry => entry != null);
    console.log(cursors);
    let cursorForPage = cursors.filter(cursor => cursor.page === pageNumber)[0];
    console.log(cursorForPage);
    return cursorForPage.cursor;
  }

  const handleSort = (columnKey) => {
    let newOrder;
    if(orderBy === columnKey){
      newOrder = (order === 'asc') ? 'desc' : 'asc'
    } else {
      newOrder = 'asc'
    }
    setPage(0);
    setOrder(newOrder);
    setOrderBy(columnKey);
    refetch({
      pageSize: rowsPerPage,
      page: 0,
      orderBy: columnKey,
      includeDeleted: includeDeleted,
      order: newOrder.toUpperCase()
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const cursor = getCursorForPage(newPage+1);
    refetch({
      pageSize: rowsPerPage,
      page: newPage+1,
      after: cursor,
      orderBy: orderBy,
      includeDeleted: includeDeleted,
      order: order.toUpperCase()
    })
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
    refetch({
      pageSize: +event.target.value,
      page: 0,
      orderBy: orderBy,
      includeDeleted: event.target.checked,
      order: order.toUpperCase()
    })
  }

  const handleChangeIncludeDeleted = (event) => {
    setIncludeDeleted(event.target.checked);
    setPage(0);
    refetch({
      pageSize: rowsPerPage,
      page: 0,
      orderBy: orderBy,
      includeDeleted: event.target.checked,
      order: order.toUpperCase()
    })
  }

  if (loading) return "Loading..."
  if (error) return `${error}`

  return(
    <>
    <Paper>
    <Toolbar style={{paddingLeft:16, paddingRight:8, justifyContent:'space-between'}}>
      <Typography variant='h6' component='div'>
        Recipes
      </Typography>
      <Tooltip title="Toggle Deleted Recipes">
          <FormControlLabel
          style={{marginRight:8}}
          control={<Checkbox checked={includeDeleted} onChange={handleChangeIncludeDeleted} name="includeDeleted" />}
          label="Include Deleted"
          />
      </Tooltip>
    </Toolbar>
    <TableContainer>
      <Table aria-label='table'>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.key}>
              <TableSortLabel
              active={orderBy === column.key}
              direction={orderBy === column.key ? order : 'asc'}
              onClick={()=>{handleSort(column.key);console.log(column)}}
              >
                {column.name}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell
            key={'actions'}
            align='right'
          >
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.adminRecipes.recipes.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{formatDate(row.createdAt) ?? '—'}</TableCell>
            <TableCell>{formatDate(row.updatedAt) ?? '—'}</TableCell>
            <TableCell>{formatDate(row.deletedAt) ?? '—'}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell align='right'>
              <IconButton size='small' style={{marginRight:'8px'}} onClick={()=>{history.push(`/recipe/edit/${row.id}`)}}><EditIcon fontSize='small'/></IconButton>
              {row.deletedAt ? <RecipeRestoreConfirmationDialog recipe={row}/> : <RecipeDeleteConfirmationDialog recipe={row}/> }
              <IconButton size='small' onClick={()=>{history.push(`/recipe/${row.id}`)}}><VisibilityIcon fontSize='small'/></IconButton>
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
      count={data.adminRecipes.totalItems}
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
