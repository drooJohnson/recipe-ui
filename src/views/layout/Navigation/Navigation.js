import React from "react";
import { useQuery, gql } from '@apollo/client';
//import { Layout, Menu, Divider } from 'antd';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import InventoryIcon from "./InventoryIcon";
import HealthBar from './HealthBar';

const PLAYER = gql`
  query GetCurrentPlayer {
    me {
      id
      money
      health
      maxHealth
      strength
      intellect
      dexterity
      race {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      class {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      inventory {
        instanceId
        templateId
        playerId
        name
        description
        iconSet
        iconName
        type
        subtype
        slot
        buyPrice
        sellPrice
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        totalCharges
        remainingCharges
        loseOnDeath
      }
      tile {
        id
        x
        y
        zone {
          id
          name
          description
        }
      }
      name
    }
  }
`
const NavigationWrapper = () => {
    const { loading, error, data } = useQuery(PLAYER);
    return <Navigation loading={loading} error={error} player={data?.me}/>
}

export const Navigation = ({loading, error, player}) => {

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  /*const playerAttributes = useSelector(state => state.player.attributes);
  const dispatch = useDispatch();

  const setPlayerName = (name) => {
    dispatch(actions.setName(name));
  }*/
  console.log("RENDER WITH:",player);
  return(
    <div style={{ zIndex: 1, width: '100%' }}>
      <Menu style={{ display: 'flex', justifyContent: 'space-between', flexDirection:'rows', borderRadius:0 }}>
        <div style={{ display: 'flex', flex: '1', justifyContent: 'flex-start', flexDirection:'rows' }}>
          <Menu.Item>RPG</Menu.Item>
          <Menu.Item>{player.name ? player.name : <Link to='/character_creation/name'>Name Yourself</Link>}</Menu.Item>
          <Menu.Item>{player.race?.name ? player.race?.name : <Link to='/character_creation/race'>Choose a Race</Link>}</Menu.Item>
          <Menu.Item>{player.class?.name ? player.class?.name : <Link to='/character_creation/class'>Choose a Class</Link>}</Menu.Item>
        </div>
        <div style={{ display: 'flex', flex: '1', justifyContent: 'flex-end', flexDirection:'rows' }}>
          <Menu.Item>
            <HealthBar player={player}></HealthBar>
          </Menu.Item>
          <Menu.Item>
            <InventoryIcon inventory={player.inventory}/>
          </Menu.Item>
        </div>
        </Menu>
    </div>
  )
}

export default NavigationWrapper;
