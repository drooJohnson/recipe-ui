import React from 'react';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

const StatModifierTable = ({baseStats, statModifierBlock}) => {
  console.log(baseStats, statModifierBlock);
  let {maxHealth, strength, intellect, dexterity} = baseStats;
  let {maxHealth: maxHealthMod, strength: strengthMod, intellect: intellectMod, dexterity: dexterityMod } = statModifierBlock;

  return(
    <Table basic="very" style={{width:'100%'}}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Attribute</Table.HeaderCell>
          <Table.HeaderCell>Modifier</Table.HeaderCell>
          <Table.HeaderCell>Result</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Health</Table.Cell>
          <Table.Cell><ModifierCell base={maxHealth} modifier={maxHealthMod}/></Table.Cell>
          <Table.Cell>{maxHealthMod + maxHealth}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Strength</Table.Cell>
          <Table.Cell><ModifierCell base={strength} modifier={strengthMod}/></Table.Cell>
          <Table.Cell>{strengthMod + strength}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Intellect</Table.Cell>
          <Table.Cell><ModifierCell base={intellect} modifier={intellectMod}/></Table.Cell>
          <Table.Cell>{intellectMod + intellect}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Dexterity</Table.Cell>
          <Table.Cell><ModifierCell base={dexterity} modifier={dexterityMod}/></Table.Cell>
          <Table.Cell>{dexterityMod + dexterity}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

const PositiveModifier = styled.span`
  color:green;
`

const NegativeModifier = styled.span`
  color:red;
`

const ZeroModifier = styled.span`
  color:rgba(210,210,210);
`

const ModifierCell = ({base = 0, modifier = 0}) => {
  const renderMod = (modifier) => {
    if (modifier === 0){
      return <ZeroModifier> ± {modifier}</ZeroModifier>
    } else if (modifier < 0){
      return <NegativeModifier> - {Math.abs(modifier)}</NegativeModifier>
    } else if (modifier > 0){
      return <PositiveModifier> + {Math.abs(modifier)}</PositiveModifier>
    }
  }
  return(
    <>{base ?? 0}{renderMod(modifier)}</>
  )
}

export default StatModifierTable;
