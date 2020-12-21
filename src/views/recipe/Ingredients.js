import React from 'react';
import PropTypes from 'prop-types'
import MDEditor from '@uiw/react-md-editor'

const Ingredients = ({ingredients}) => {
  return(
    <MDEditor.Markdown style={{fontFamily:'inherit'}} source={ingredients}/>
  )
}

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
}

export default Ingredients;
