import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useParams, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ChipTagList from './components/ChipTagList'
import styled from 'styled-components'
import RecipeHeader from './recipe/RecipeHeader'
import Ingredients from './recipe/Ingredients'
import Step from './recipe/Step'
import Hidden from '@material-ui/core/Hidden'
import {device} from '../utils/device'

//import MDEditor from '@uiw/react-md-editor'

const RECIPE = gql`
  query Recipe($id: ID!){
    recipe(id: $id){
      id,
      name,
      description,
      imageUrl,
      imageColor,
      imageAltText,
      ingredients,
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

  @media ${device.mobile} {
    height:6px;
    width:8px;
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
  grid-column-start: 5;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  margin-bottom:48px;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
    margin-bottom:24px;
  }
`

const DescriptionText = styled.p`
  font-size:20px;
  line-height:32px;
  font-weight:300;
  font-style:italic;
  margin-left:32px;
  @media ${device.mobile} {
    margin-left:0px;
  }
`

const IngredientsSection = styled.div`
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 3;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
    grid-row-start: 2;
    grid-row-end: 3;
    margin-bottom:36px;
  }
`

const Steps = styled.div`
  grid-column-start: 5;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 3;
  display: grid;
  grid-template-columns:repeat(9, 1fr);
  grid-template-rows: auto;
  column-gap:24px;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:13;
    grid-row-start: 3;
    grid-row-end: 4;
    display:block;
  }
`

const DashedSubheadWrapper = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  margin-bottom:16px;
  text-transform:uppercase;
  @media ${device.mobile} {
    margin-left:-24px;
  }
`

const DashedSubhead = ({children}) => {
  return (
    <DashedSubheadWrapper>
      <Hidden mdUp><Tick/></Hidden>
      {children}
      <Hidden smDown><Tick/></Hidden>
    </DashedSubheadWrapper>
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
          <DashedSubhead>
            <Typography variant='h6'>Notes</Typography>
          </DashedSubhead>
          <DescriptionText>
            {/*<MDEditor.Markdown style={{fontSize:'20px',fontFamily:'inherit'}} source={description}/>*/}
          </DescriptionText>
        </Description>
        <IngredientsSection>
          <DashedSubhead>
            <Typography variant='h6'>Ingredients</Typography>
          </DashedSubhead>
          <Ingredients ingredients={ingredients}/>
        </IngredientsSection>
        <Steps>
          <Hidden mdUp><DashedSubhead><Typography variant='h6'>Directions</Typography></DashedSubhead></Hidden>
          {renderSteps(steps)}
        </Steps>
      </GridContainer>
    </>
  )
}

export default Recipe;
