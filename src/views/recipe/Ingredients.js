import React from 'react';
import PropTypes from 'prop-types'
//import MDEditor from '@uiw/react-md-editor'
import styled from 'styled-components'

/*const IngredientsStyles = styled(MDEditor.Markdown)`
  font-family:'inherit';
  ul,ol,dl{
    list-style:none;
    padding:0;
  }
  h3{
    margin-top:16px;
    margin-bottom:8px;
  }
`*/

const Ingredients = ({ingredients}) => {
  return(
    <>
    {/*<IngredientsStyles style={{fontFamily:'inherit'}} source={ingredients}/>*/}
      {ingredients}
    </>
  )
}

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
}

export default Ingredients;
