import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useParams, Link, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ChipTagList from './components/ChipTagList'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import RecipeHeader from './recipe/RecipeHeader'
import Ingredient from './recipe/Ingredient'
import Step from './recipe/Step'

import auth from '../Auth'

const RECIPE = gql`
  query Recipe($id: ID!){
    recipe(id: $id){
      id,
      name,
      description,
      imageUrl,
      imageColor,
      imageAltText,
      ingredients {
        id,
        displayOrder,
        quantity,
        unit,
        type,
        name
      },
      steps {
        id,
        displayOrder,
        title,
        type,
        imageUrl,
        altText,
        text,
        color,
        side
      },
      tags {
        id,
        slug,
        text,
        kind
      }
    }
  }
`

const Tick = styled.div`
  width: 16px;
  height: 2px;
  background-color: black;
  &:first-child{
    margin-right: 16px;
  }
  &:last-child{
    margin-left: 16px;
  }
`

const GridContainer = styled.div`
  display:grid;
  grid-template-columns:repeat(12, 1fr);
  grid-template-rows:auto;
  column-gap:24px;
  margin-top:60px;
`

const Description = styled.div`
  grid-column-start: 4;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  margin-bottom:48px;
`

const DescriptionText = styled.p`
  font-size:20px;
  line-height:32px;
  font-weight:300;
  font-style:italic;
  margin-left:32px;
`

const Ingredients = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
`

const Steps = styled.div`
  grid-column-start: 4;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 3;
  display: grid;
  grid-template-columns:repeat(9, 1fr);
  grid-template-rows: auto;
  column-gap:24px;
`

const DashedSubhead = ({children}) => {
  return (
    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',marginBottom:16,textTransform:'uppercase'}}>
      {children}
      <Tick/>
    </div>
  )
}

const Recipe = () => {
  let { id: recipeId } = useParams();
  const { loading, data, error } = useQuery(RECIPE, { variables: { id: recipeId } });

  if (loading) return "Loading..."
  if (error) return `${error}`
  if (data.recipe === null) return <Redirect to="/404"/>

  const {id, name, description, ingredients, steps, tags} = data.recipe;

  const renderSteps = (steps) => {
    var count = 1;
    return steps?.map((step, index) => {
      console.log(count);
      console.log(step.type);
      if (step.type === 'TEXT'){
        count += 1;
        return <Step step={step} stepNumber={count}/>
      } else {
        count = 0;
        return <Step step={step}/>
      }
    })
  }

  return(
    <>
      <RecipeHeader name={name} date={null} recipeId={id} imageUrl={data.recipe.imageUrl} imageColor={data.recipe.imageColor} imageAltText={data.recipe.imageAltText}>
        <div>
          {tags && <ChipTagList tags={tags} fadeOverflow={false}/>}
        </div>
      </RecipeHeader>
      <GridContainer>
        <Description>
          <DashedSubhead><Typography variant='h6'>Notes</Typography></DashedSubhead>
          <DescriptionText>{description}</DescriptionText>
        </Description>
        <Ingredients>
          <DashedSubhead><Typography variant='h6'>Ingredients</Typography></DashedSubhead>
          {ingredients?.map(ingredient => {
            return <Ingredient ingredient={ingredient}/>
          })}
        </Ingredients>
        {renderSteps(steps)}
      </GridContainer>
    </>
  )
}

export default Recipe;
