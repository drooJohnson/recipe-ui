import React from "react";
import Item from './Item'
import ITEMS from 'data/item';

export default {
  title: 'Item',
  component: Item
}

export const Default = () => <Item item={ITEMS.DAGGER}/>
