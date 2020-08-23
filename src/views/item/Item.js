import React, {useState} from 'react';
import styled from 'styled-components';
import { Popover, Divider } from 'antd';
import { formatItemSlot, formatItemType, formatItemSubType } from 'utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
//import { usePopper } from 'react-popper';

const ItemBox = styled.div`
  height:64px;
  width:64px;
  background-color:black;
  border-radius:4px;
  &:hover{
    box-shadow:0 0 8px 4px rgba(255, 255, 0, 1.0);
  }
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
`

const Description = styled.div`
  font-style: italic;
`

const Name = styled.div`
  font-size: 1.2em;
  font-weight:bold;
`

const Types = styled.div`
  display:flex;
  justify-content:space-between;
  font-size: 1.0em;
`

const Stat = ({name, value}) => {
    if (value == 0) { return null }
    else if (value > 0){
      return <div style={{color:'green'}}>+{value} {name}</div>
    } else {
      return <div style={{color:'red'}}>{value} {name}</div>
    }
}

const StatList = ({statModifiers}) => {
  return(
    <>
      <Stat name={"Max Health"} value={statModifiers.maxHealth}/>
      <Stat name={"Strength"} value={statModifiers.strength}/>
      <Stat name={"Intellect"} value={statModifiers.intellect}/>
      <Stat name={"Dexterity"} value={statModifiers.dexterity}/>
    </>
  )
}

const ItemTyping = ({item}) => {
  if (item.type === "ARMOR" || item.type === "WEAPON"){
    return(<><div>{formatItemSlot(item.slot)}</div><div>{formatItemSubType(item.subtype)}</div></>)
  } else {
    return(<><div>{formatItemType(item.type)}</div><div>{formatItemSubType(item.subtype)}</div></>)
  }
}

const ItemPopover = ({item}) => {
  return(
    <div style={{width:240}}>
      <Name>{item.name}</Name>
      <Types>
        <ItemTyping item={item}/>
      </Types>
      <StatList statModifiers={item.statModifiers}/>
      <Divider style={{marginTop:8,marginBottom:8}}/>
      {(item.remainingCharges > 0) && <span>Remaining Charges: {item.remainingCharges}/{item.totalCharges}</span>}
      <Description>{item.description}</Description>
      <Divider style={{marginTop:8,marginBottom:8}}/>
      <div style={{display:'flex', alignItems:'center'}}>Sell Price: <FontAwesomeIcon size="xs" icon={faCoins} fixedWidth style={{marginLeft:'4px',marginRight:'2px'}}/>{item.sellPrice}</div>
    </div>
  )
}

const Item = ({item}) => {
  return (
    <>
      <Popover mouseEnterDelay={0} mouseLeaveDelay={0} placement='rightTop' content={<ItemPopover item={item}/>}>
        <ItemBox item={item}><FontAwesomeIcon style={{flex:1}} size='2x' icon={[item.iconSet,item.iconName]}/></ItemBox>
      </Popover>
    </>
  );
};

export default Item;
