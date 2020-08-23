import React from "react";
import Inventory from './Inventory'
import {ITEM_ARR} from 'data/item';

export default {
  title: 'Inventory',
  component: Inventory
}

export const Default = () => <Inventory inventory={ITEM_ARR}/>
