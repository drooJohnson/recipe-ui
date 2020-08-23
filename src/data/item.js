export const DAGGER = {
  id: "WORN_DAGGER",
  name: "Worn Dagger",
  description: "An iron dagger with a leather-wrapped handle and a somewhat sharp blade",
  type: "WEAPON",
  subtype: "DAGGER",
  slot: "WEAPON_MAIN_HAND",
  buyPrice: 100,
  sellPrice: 80,
  statModifiers:{
    maxHealth: 0,
    strength: 10,
    intellect: 0,
    dexterity: -1,
    },
  loseOnDeath: false,
  totalCharges: -1
}

export const SWORD = {
  id: "CRUDE_IRON_SWORD",
  name: "Crude Iron Sword",
  description: "A crude iron sword, likely mass-produced. A small three-pointed star is embossed on the pommel",
  type: "WEAPON",
  subtype: "SWORD_1H",
  slot: "WEAPON_MAIN_HAND",
  buyPrice: 100,
  sellPrice: 80,
  statModifiers:{
    maxHealth: 0,
    strength: 10,
    intellect: 0,
    dexterity: -1,
    },
  loseOnDeath: false,
  totalCharges: -1
}

export const STAFF = {
  id: "BONE_ROD",
  name: "Bone Rod",
  description: "A long sun-bleached femur. On closer inspection, a bulge hints at its original owner's demise.",
  type: "WEAPON",
  subtype: "STAFF",
  slot: "WEAPON_TWO_HAND",
  buyPrice: 100,
  sellPrice: 80,
  statModifiers:{
    maxHealth: 0,
    strength: 10,
    intellect: 0,
    dexterity: -1,
    },
  loseOnDeath: false,
  totalCharges: -1
}

export const POTION = {
  id: "MINOR_POTION",
  name: "Minor Potion",
  description: "Restores a small amount of health. The taste may not be worth it.",
  type: "CONSUMABLE",
  subtype: null,
  slot: "IN_BAG",
  buyPrice:10,
  sellPrice:8,
  statModifiers:{
    maxHealth:0,
    strength:0,
    intellect:0,
    dexterity:0,
    },
  loseOnDeath:false,
  totalCharges:1
}

export const TRASH = {
  id: "TRASH",
  name: "Trash",
  description: "Why litter when you can get a couple coins from the shop?",
  type: "MISC",
  subtype: null,
  slot: "IN_BAG",
  buyPrice:0,
  sellPrice:2,
  statModifiers:{
    maxHealth:0,
    strength:0,
    intellect:0,
    dexterity:0,
    },
  loseOnDeath:false,
  totalCharges:-1
}

export const KEY = {
  id: "CRUDE_IRON_KEY",
  name: "Crude Iron Key",
  description: "A simple and haphazardly hewn iron key",
  type: "KEY",
  subtype: null,
  slot: "IN_BAG",
  buyPrice:10,
  sellPrice:8,
  statModifiers:{
    maxHealth:0,
    strength:0,
    intellect:0,
    dexterity:0,
    },
  loseOnDeath:false,
  totalCharges:1
}

export const QUEST = {
  id: "STARTER_QUEST_RECIPE",
  name: "Minor Potion Recipe",
  description: "The ingredients for a potion recipe — 1 red mushroom",
  type: "QUEST",
  subtype: null,
  slot: "IN_BAG",
  buyPrice:10,
  sellPrice:8,
  statModifiers:{
    maxHealth:0,
    strength:0,
    intellect:0,
    dexterity:0,
    },
  loseOnDeath:false,
  totalCharges:-1
}

export const ITEM_ARR = [
  QUEST, KEY, TRASH, POTION, STAFF, SWORD, DAGGER
];

const ITEMS = {
  QUEST, KEY, TRASH, POTION, STAFF, SWORD, DAGGER
}

export default ITEMS;
