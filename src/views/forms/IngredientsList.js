import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IngredientCard from './IngredientCard';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';

import * as _ from 'lodash';

import update from 'immutability-helper';

export const Ingredients = ({updateIngredients, ingredients}) => {

  const calcDisplayOrder = (ingredients) => {
    var displayOrder = 1;
    var ingredientsOrdered = ingredients.map((ingredient) => {
      if(ingredient.delete) {
        return {...ingredient }
      } else {
        return {...ingredient, displayOrder: displayOrder++ };
      }
    });

    return ingredientsOrdered;
  }

  const addIngredient = () => {
    let newIngredient = {quantity: null, unit: null, name: null, key: `new-${ingredients.length+1}`, type: "INGREDIENT", uiKey: uuidv4()};
    // auto-assign a key since this ingredient won't have a DB ID to use as one
    updateIngredients(calcDisplayOrder([...ingredients, newIngredient]));
  }

  const addIngredientHeader = () => {
    let newIngredient = {quantity: null, unit: null, name: null, key: `new-${ingredients.length+1}`, type: "HEADER", uiKey: uuidv4()};
    // auto-assign a key since this ingredient won't have a DB ID to use as one
    updateIngredients(calcDisplayOrder([...ingredients, newIngredient]));
  }

  const updateIngredient = (ingredient,index) => {
    var newIngredients = [...ingredients];
    newIngredients[index] = {...ingredient};
    updateIngredients(newIngredients);
  }

  const moveIngredient = (dragIndex, hoverIndex) => {
    const dragIngredient = ingredients[dragIndex];
    updateIngredients(
      calcDisplayOrder(
        update(
          ingredients, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragIngredient]
            ]
          }
        )
      )
    )
  }

  const removeIngredient = (index) => {
    if (ingredients[index].id) {
      let newIngredients = ingredients.map((ingredient, mapIndex) => {
        if (mapIndex === index) {
          return { ...ingredient, delete: true};
        } else { return ingredient }
      });
      return updateIngredients(calcDisplayOrder(newIngredients));
    } else {
      let newIngredients = ingredients.filter((ingredient, mapIndex) => {
        if (mapIndex === index) {
          return false;
        } else {
          return true;
        }
      });
      return updateIngredients(calcDisplayOrder(newIngredients));
    }
  }

  let orderedIngredients = _.orderBy(ingredients, ['displayOrder'])

  return (
    <Grid container spacing={2} style={{marginBottom:'24px'}}>
      <Grid item xs={12}><Typography variant='h5'>Ingredients</Typography></Grid>
      <Grid item xs={12}>
        <Paper>
          <List>
            {orderedIngredients.map((ingredient,index) => {
              if (ingredient.delete) { return null }
              return(
                <IngredientCard
                  ingredient={ingredient}
                  index={index}
                  addIngredient={addIngredient}
                  updateIngredient={updateIngredient}
                  removeIngredient={removeIngredient}
                  moveIngredient={moveIngredient}
                  key={ingredient.id ?? ingredient.uiKey}
                />
              )
            })}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup variant='contained' color='primary' type='button' fullWidth>
          <Button onClick={addIngredient}>New Ingredient</Button>
          <Button onClick={addIngredientHeader}>New Section</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

Ingredients.propTypes = {
  updateIngredients: PropTypes.func,
  ingredients: PropTypes.array,
}

Ingredients.defaultProps = {
  updateIngredients: (newIngredients) => { console.log(newIngredients); },
  ingredients: []
}

export default Ingredients;
