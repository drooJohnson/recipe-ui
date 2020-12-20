import React from 'react';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import {device} from '../../utils/device'
import MDEditor from '@uiw/react-md-editor'

const IngredientText = styled(Typography)`
  margin-bottom:8px;
`

const IngredientHeader = styled(Typography)`
  margin-bottom:8px;
  display:flex;
  alignItems:center;
`

const Ingredients = ({ingredients}) => {
  return(
    <MDEditor.Markdown style={{fontFamily:'inherit'}} source={ingredients}/>
  )
  /*switch(ingredient.type){
    case "INGREDIENT":
      return (
        <IngredientText variant='body2'>
          {ingredient.quantity} {ingredient.unit} {ingredient.name}
        </IngredientText>
      )
    case "HEADER":
      return (
        <IngredientHeader variant='subtitle2'>
          {ingredient.name}
        </IngredientHeader>
      )
    default:
      console.log("Ingredient with unhandled type found");
      return null;
  }*/
}

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
}

export default Ingredients;
