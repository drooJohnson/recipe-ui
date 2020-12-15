import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import {useHistory} from 'react-router-dom';

const chipListStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    justifyContent:'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
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
      <LocalOfferIcon style={{fontSize:14, lineHeight:20, marginRight:4}}/>
      {tags?.map(tag => {
        return <Chip key={tag.id} label={tag.text} onClick={()=>{history.push(`/tag/${tag.id}`)}} size='small'/>
      })}
    </div>
  )
}

export default ChipTagList;
