import React from 'react';
import { Ingredients } from './IngredientsList'

const ingredients = [
  {
    displayOrder: 1,
    id: "50f6ffe4-2b97-42eb-9cad-094dcf2d6d7d",
    name: "ingName",
    quantity: "1",
    sectionName: null,
    unit: "unit"
  },{
    displayOrder: 2,
    id: "50f6ffe4-2b97-42eb-9cad-094dcf2d6d7d",
    name: "ingName",
    quantity: "1",
    sectionName: null,
    unit: "unit"
  },{
    displayOrder: 3,
    id: "50f6ffe4-2b97-42eb-9cad-094dcf2d6d7d",
    name: "ingName",
    quantity: "1",
    sectionName: null,
    unit: null
  },
]

export const Primary = () => <Ingredients ingredients={ingredients}/>

export default {
  title: 'Forms/RecipeForm/Ingredients',
  compoennt: Ingredients
}
