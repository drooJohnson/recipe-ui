const itemSlotMap = {
  "IN_BAG":"In Bag",
  "HEAD":"Head",
  "NECK":"Neck",
  "SHOULDERS":"Shoulders",
  "BODY":"Shirt",
  "CHEST":"Chest",
  "WAIST":"Waist",
  "LEGS":"Legs",
  "FEET":"Feet",
  "WRISTS":"Wrists",
  "HANDS":"Hands",
  "FINGER":"Ring",
  "WEAPON":"One-Hand",
  "WEAPON_MAIN_HAND":"Main-Hand",
  "WEAPON_OFF_HAND":"Off-Hand",
  "WEAPON_TWO_HAND":"Two-Hand",
  "SHIELD":"Shield",
  "BACK":"Back"
}

export const formatItemSlot = (itemSlot) => {
  return itemSlotMap[itemSlot];
}

const itemTypeMap = {
  "CONSUMABLE":"Consumable",
  "WEAPON":"Weapon",
  "ARMOR":"Armor",
  "KEY":"Key",
  "QUEST":"Quest",
  "MISC":"Misc"
}

export const formatItemType = (itemType) => {
  return itemTypeMap[itemType];
}

const itemSubTypeMap = {
"AXE_1H":"Axe",
"AXE_2H":"Axe",
"BOW":"Bow",
"GUN":"Gun",
"MACE_1H":"Mace",
"MACE_2H":"Mace",
"SWORD_1H":"Sword",
"SWORD_2H":"Sword",
"STAFF":"Staff",
"DAGGER":"Dagger",
"THROWN":"Throwing",
"SPEAR":"Spear",
"WAND":"Wand",
"CLOTH":"Cloth",
"LEATHER":"Leather",
"MAIL":"Mail",
"PLATE":"Plate"
}

export const formatItemSubType = (itemSubType) => {
  return itemSubTypeMap[itemSubType];
}

const typeMap = {
  "FIRE":"Fire",
  "WATER":"Water",
  "EARTH":"Earth",
  "WIND":"Wind",
  "LIGHT":"Light",
  "DARK":"Dark",
  "BLUNT":"Blunt",
  "PIERCING":"Piercing",
  "SLASH":"Slash",
  "BALLISTIC":"Ballistic",
  "THROWN":"Thrown"
}

export const formatType = (type) => {
  return typeMap[type];
}
