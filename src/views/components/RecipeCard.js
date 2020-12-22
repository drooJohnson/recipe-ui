import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FilteredImage from './FilteredImage';
import styled from 'styled-components';
import {device} from '../../utils/device';
import TextTruncate from 'react-text-truncate';

import LinkTagList from './LinkTagList';

import {useHistory} from 'react-router-dom';

const Recipe = styled.div`

`
const Image = styled(CardMedia)`
  height:180px;
`

const RecipeCard = ({recipe}) => {
  const history = useHistory();
  return(
    <Card style={{flexGrow:1}}>
      <CardActionArea onClick={()=>{history.push(`/recipe/${recipe.id}`)}}>
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
  /*return(
    <Card key={recipe.id} style={{display:'flex', flexDirection:'column', justifyContent:'stretch', alignItems:'stretch', flexGrow:1}}>
      <CardContent style={{flexGrow:1}}>
        <Link to={`/recipe/${recipe.id}`}>
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.name}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {recipe.description}
          </Typography>
          <LinkTagList tags={recipe.tags}/>
        </Link>
      </CardContent>
      <CardActions>
        <Button>View</Button>
      </CardActions>
    </Card>
  )*/
}

export default RecipeCard;
