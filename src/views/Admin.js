import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
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
import VisibilityIcon from '@material-ui/icons/Visibility';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

const RECIPES = gql`
  query Recipes {
    adminRecipes {
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
      deletedAt
    }
  }
`

const UPDATE_RECIPE_STATUS = gql`
  mutation UpdateRecipeStatus (
    $recipeId: ID!,
    $status: RecipeStatus!
  ) {
    updateRecipeStatus (
      recipeId: $recipeId,
      status: $status
    ) {
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
      deletedAt
    }
  }
`

const columns = [
  {name: 'Name', key: 'name', sortable: true, align:'left'},
  {name: 'Created', key: 'createdAt', sortable: true, align:'left'},
  {name: 'Updated', key: 'updatedAt', sortable: true, align:'left'},
  {name: 'Deleted', key: 'deletedAt', sortable: true, align:'left'},
  {name: 'Status', key: 'status', sortable: true, align:'left'},
  {name: 'Actions', key: 'actions', sortable: false, align:'right'}
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
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const {loading, data, error} = useQuery(RECIPES);
  const [updateRecipeStatus, {loading: updateLoading, data: updateData, error: updateError}] = useMutation(UPDATE_RECIPE_STATUS);


  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSort = (columnKey) => {
    const isAsc = orderBy === columnKey && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnKey);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  }

  const handleChangeIncludeDeleted = (event) => {
    setIncludeDeleted(event.target.checked);
    setPage(0);
  }

  if (loading) return "Loading..."
  if (error) return `${error}`

  const filteredRows = includeDeleted ? data.adminRecipes : data.adminRecipes.filter(row => row.deletedAt == null);
  const deletedRows = data.adminRecipes.filter(row => row.deletedAt != null);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

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
          label={`Include Deleted (${deletedRows?.length ?? `0`})`}
          />
      </Tooltip>
    </Toolbar>
    <TableContainer>
      <Table aria-label='table'>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.key} align={column.align}>
              {column.sortable ?
                <TableSortLabel
                  active={orderBy === column.key}
                  direction={orderBy === column.key ? order : 'asc'}
                  onClick={()=>{handleSort(column.key)}}
                >
                  {column.name}
                </TableSortLabel>
                :
                <>{column.name}</>
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(filteredRows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{formatDate(row.createdAt) ?? '—'}</TableCell>
            <TableCell>{formatDate(row.updatedAt) ?? '—'}</TableCell>
            <TableCell>{formatDate(row.deletedAt) ?? '—'}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell align='right'>
              {
                (row.status !== 'PUBLISHED')
                ?
                <Tooltip title='Publish'>
                  <IconButton
                    size='small'
                    style={{marginRight:'8px'}}
                    onClick={()=>{updateRecipeStatus({variables:{recipeId:row.id, status:'PUBLISHED'}})}}
                  >
                    <PublishIcon fontSize='small'/>
                  </IconButton>
                </Tooltip>
                :
                <Tooltip title='Unpublish'>
                  <IconButton
                    size='small'
                    style={{marginRight:'8px'}}
                    onClick={()=>{updateRecipeStatus({variables:{recipeId:row.id, status:'DRAFT'}})}}
                  >
                    <GetAppIcon fontSize='small'/>
                  </IconButton>
                </Tooltip>
              }
              <Tooltip title="Edit"><IconButton size='small' style={{marginRight:'8px'}} onClick={()=>{history.push(`/recipe/edit/${row.id}`)}}><EditIcon fontSize='small'/></IconButton></Tooltip>
              {row.deletedAt ? <RecipeRestoreConfirmationDialog recipe={row}/> : <RecipeDeleteConfirmationDialog recipe={row}/> }
              <Tooltip title="View"><IconButton size='small' onClick={()=>{history.push(`/recipe/${row.id}`)}}><VisibilityIcon fontSize='small'/></IconButton></Tooltip>
            </TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows}}><TableCell colSpan={columns.length + 1}/></TableRow>
        )}
      </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10,25,50]}
      component='div'
      count={filteredRows.length}
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
