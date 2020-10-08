import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import * as _ from 'lodash'

import { Input, Table } from 'semantic-ui-react'

const ACTIONS = gql`
  query SearchActions($sortBy:String!, $order:String!, $searchBy:String, $filter:String){
    searchActions(sortBy:$sortBy, order:$order, searchBy:$searchBy, filter:$filter){
      id,
      text,
      conditions,
      results
    }
  }
`

const ActionsScene = () => {
  const {data, loading, error, refetch} = useQuery(ACTIONS, {variables: {
    searchBy: 'all',
    filter: '',
    sortBy: 'id',
    order: 'ascending'
  }})

  const [sortBy, setSortBy] = useState("id")
  const [order, setOrder] = useState("ascending");
  const [searchBy, setSearchBy] = useState('all');
  const [filter, setFilter] = useState(null);

  let history = useHistory();

  let columns = [
    'id',
    'text',
    'conditions',
    'results'
  ]

  const refetchQuery = () => {
    refetch({
      searchBy: searchBy,
      filter: filter,
      sortBy: sortBy,
      order: order
    })
  }

  useEffect(() => {
    refetchQuery();
  }, [sortBy, order, searchBy, filter])

  if (loading) return "Loading..."
  if (error) return "Error..."

  /*const getColumns = () => {
    console.log(data);
    return Object.keys(data?.searchActions?.[0])?.filter((key) => {
      return (key !== "__typename");
    });
  }*/

  const onSearchChange = (e, {value}) => {
    console.log(value);
    setFilter(value ?? null);
  }

  const handleSort = (_sortBy) => {
    if (_sortBy === sortBy) {
      setOrder((order === 'ascending') ? 'descending' : 'ascending')
    } else {
      setSortBy(_sortBy)
      setOrder('ascending')
    }
  }

  const headerRow = (columns) => {
    return(
      <Table.Header>
      <Table.Row>
        {columns.map((col) => {
          return (
            <Table.HeaderCell
              onClick={()=>handleSort(col)}
              sorted={(sortBy === col) ? order : null}
            >
              {col.charAt(0).toUpperCase() + col.slice(1)}</Table.HeaderCell>
          )
        })}
        </Table.Row>
      </Table.Header>
    )
  }

  const renderRow = (rowData) => {
    let filteredRowData = _.omit(rowData, '__typename');
    let rowColumns = Object.keys(filteredRowData);
    let rowValues = Object.values(filteredRowData);
    return(
      <Table.Row onClick={()=>{history.push('/admin/action/' + rowData.id)}}>
        {rowValues.map((value) => {
          return <Table.Cell>{value}</Table.Cell>
        })}
      </Table.Row>
    )
  }

  return(
    <>
      <Input
        icon='search'
        placeholder='Search...'
        loading={loading}
        onChange={onSearchChange}
        value={filter}
      />
      <Table sortable>
        {headerRow(columns)}
        <Table.Body>
        {data.searchActions.map((action) => renderRow(action))}
        </Table.Body>
      </Table>
    </>
  )
}

export default ActionsScene;
