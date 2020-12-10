import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import {useHistory} from 'react-router-dom';

const chipListStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    justifyContent:'flex-start',
    flexWrap: 'wrap',
    margin: -theme.spacing(0.5),
    marginTop: 0,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const ChipTagList = ({tags}) => {
  const classes = chipListStyles();
  const history = useHistory();
  if (tags.length < 1){
    return null;
  }
  return(
    <div className={classes.root}>
      {tags?.map(tag => {
        return <Chip key={tag.id} label={tag.text} onClick={()=>{history.push(`/tag/${tag.id}`)}} size='small'/>
      })}
    </div>
  )
}

export default ChipTagList;
