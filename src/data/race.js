export const HUMAN = {
  id: "HUMAN",
  name: "Human",
  statModifiers: {
    maxHealth: 0,
    strength: 2,
    intellect: 0,
    dexterity: 0
  },
  //abilities: null,
  description: "Issa man tho",
  //resistances: null,
  //vulnerabilities: null
}

export const AEROI = {
  id: "AEROI",
  name: "Aeroi",
  statModifiers: {
    maxHealth: 0,
    strength: 0,
    intellect: 1,
    dexterity: 1
  },
  //abilities: null,
  description: "Dreamy bitches forreal",
  //resistances: null,
  //vulnerabilities: null
}

const RACES = {
  HUMAN: HUMAN,
  AEROI: AEROI
}

export default RACES
