export const CRUSADER = {
  id: "CRUSADER",
  name: "Crusader",
  statModifiersBlock: {
    maxHealth: 1,
    strength: 4,
    intellect: -2,
    dexterity: 2,
  },
  abilities: null,
  description: "Holy tank"
}

export const CORSAIR = {
  id: "CORSAIR",
  name: "Corsair",
  statModifiersBlock: {
    maxHealth: -1,
    strength: -2,
    intellect: 3,
    dexterity: 3,
  },
  abilities: null,
  description: "Tricksy pirate boi"
}

export const LIMANOMANCER = {
  id: "LIMANOMANCER",
  name: "Limanomancer",
  statModifiersBlock: {
    maxHealth: 0,
    strength: -2,
    intellect: 4,
    dexterity: 2,
  },
  abilities: null,
  description: "Some bullshit about liminal spaces"
}

const CLASSES = {
  CRUSADER: CRUSADER,
  CORSAIR: CORSAIR,
  LIMANOMANCER: LIMANOMANCER
}

export default CLASSES
