import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const linkListStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  scroller: {
    flexGrow:1,
    overflowX:'auto',
    display:'flex',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '-ms-overflow-style':'none',
    'scrollbar-width':'none'
  },
  tag: {
    flexShrink:0,
    '&::after': {
      display:'inline-block',
      content:'","',
      marginRight:'4px',
    },
    '&:last-of-type::after': {
      content:'none',
      display:'none'
    }
  },
  listFade: {
    background:'linear-gradient(to right, rgba(255,255,255,0.0), rgba(255,255,255,1.0))',
    width:'40px',
    height:'1.5em',
    marginLeft:'-40px',
    marginTop:'-0.25em',
    marginBottom:'-0.25em',
    flexGrow:'0',
    flexShrink:'0'
  }
}))

const LinkTagList = ({tags, fadeOverflow = true}) => {
  const classes = linkListStyles();
  if (tags.length < 1){
    return null;
  }
  return (
    <div className={classes.root}>
      <LocalOfferIcon style={{fontSize:14, lineHeight:20, marginRight:4}}/>
      <div className={classes.scroller}>
        {tags.map(tag => {
          return <div className={classes.tag} key={tag.id}>{tag.text}</div>
        })}
      </div>
      {fadeOverflow && <div className={classes.listFade}/>}
    </div>
  )
}

export default LinkTagList;
