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
  li{
    margin-bottom:4px;
  }
  h3{
    margin-top:16px;
    margin-bottom:8px;
  }
  blockquote{
    padding:0;
    margin:0;
    margin-top:-8px;
    color:rgba(0,0,0,0.5);
    padding-top:-8px;
    font-style:italic;
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
