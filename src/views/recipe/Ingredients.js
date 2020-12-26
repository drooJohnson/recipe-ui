import React from 'react';
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const IngredientsStyles = styled(ReactMarkdown)`
  font-family:inherit;
  ul,ol,dl{
    list-style:none;
    padding:0;
  }
  h3{
    margin-top:16px;
    margin-bottom:8px;
  }
`

const Ingredients = ({ingredients}) => {
  return(
    <IngredientsStyles children={ingredients}/>
  )
}

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
}

export default Ingredients;
