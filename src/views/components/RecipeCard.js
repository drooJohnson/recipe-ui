import React from 'react';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LinkTagList from './LinkTagList';

import {Link, useHistory} from 'react-router-dom';

const RecipeCard = ({recipe}) => {
  const history = useHistory();

  return(
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
  )
}

export default RecipeCard;