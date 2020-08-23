import React from 'react';
import styled from 'styled-components';
import Item from '../item/Item'

const InventoryContainer = styled.div`
  width: 296px;
  min-height:80px;
  margin: 0 -4px;
  padding: 8px;
  display:flex;
  background-color:pink;
`

const InventoryGrid = styled.div`
  display: flex;
  margin: -4px;
  flex-wrap: wrap;
`

const ItemSlot = styled.div`
  width: 64px;
  height: 64px;
  margin: 4px;
`

const ItemSpace = styled.div`
  border-radius: 4px;
  width:64px;
  height:64px;
  background-color:rgba(0,0,0,0.15);
`

const EmptyState = styled.div`
  display: flex;
  margin: -4px;
  justify-content: center;
  align-items: center;
  flex:1;
`

const EmptyStateText = styled.div`
  text-shadow: 0 0 4px black;
  color: white;
  font-weight: bold;
  text-align:center;
  flex:1;
`

const Inventory = ({inventory}) => {
  if (!inventory || inventory?.length < 1){
    return (
      <InventoryContainer>
        <EmptyState>
          <EmptyStateText>Your inventory is empty!</EmptyStateText>
        </EmptyState>
      </InventoryContainer>
    )
  }
  let rows = Math.ceil(inventory.length/4);
  let emptySlots = (rows * 4) - inventory.length;

  return(
    <InventoryContainer>
      <InventoryGrid>
      {
        inventory.map(item => {
          return (<ItemSlot><Item item={item}/></ItemSlot>)
        })
      }{
        [...new Array(emptySlots)].map(emptySlot => {
          return (<ItemSlot><ItemSpace/></ItemSlot>)
        })
      }
      </InventoryGrid>
    </InventoryContainer>
  )
}

export default Inventory;
