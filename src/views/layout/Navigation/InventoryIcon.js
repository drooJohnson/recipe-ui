import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSack } from '@fortawesome/pro-solid-svg-icons';
import { Popover } from 'antd';
import Inventory from 'views/character/Inventory'

const InventoryIcon = ({inventory}) => {
  return(
    <Popover mouseEnterDelay={0} placement='rightTop' content={<Inventory inventory={inventory}/>}>
      <FontAwesomeIcon icon={faSack}/>
    </Popover>
  )
}

export default InventoryIcon;
