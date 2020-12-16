import React from 'react';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import {device} from '../../utils/device'

const IngredientText = styled(Typography)`
  margin-bottom:8px;
  margin-left:16px;
  @media ${device.mobile} {
    margin-left:0;
  }
`

const IngredientHeader = styled(Typography)`
  margin-bottom:8px;
  margin-left:16px;
  display:flex;
  alignItems:center;
  @media ${device.mobile} {
    margin-left:0;
  }
`

const Ingredient = ({ingredient}) => {
  switch(ingredient.type){
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
  }
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({  quantity: PropTypes.string,
    unit: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.oneOf(['INGREDIENT','HEADER']).isRequired
  }).isRequired
}

export default Ingredient;
