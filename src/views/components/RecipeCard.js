import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import TextTruncate from 'react-text-truncate';
import {useHistory} from 'react-router-dom';

import styled from 'styled-components';

const Image = styled(CardMedia)`
  height:180px;
`

const RecipeCard = ({recipe}) => {
  const history = useHistory();
  return(
    <Card style={{flexGrow:1}}>
      <CardActionArea onClick={()=>{history.push(`/recipe/${recipe.slug}`)}}>
      <Image title={recipe.name} image={recipe.imageUrl}/>
      <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <TextTruncate line={3} element="span" truncateText="..." text={recipe.description}/>
          </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default RecipeCard;
