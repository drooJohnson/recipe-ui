import React from 'react';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'


const Ingredient = ({ingredient}) => {
  switch(ingredient.type){
    case "INGREDIENT":
      return (
        <Typography variant='body2' style={{marginBottom:'8px',marginLeft:'16px'}}>
          {ingredient.quantity} {ingredient.unit} {ingredient.name}
        </Typography>
      )
    case "HEADER":
      return (
        <Typography variant='subtitle2' style={{marginBottom:'8px',marginLeft:'0',display:'flex',alignItems:'center'}}>
          {ingredient.name}
        </Typography>
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
