import type { Monster } from "../../../lib/type";

export const livingArmor: Monster[] = [
    {
    name: "Rusty Armor",
    monsterFamilly: "living armor",
    difficulty: 8,
    hp: 8,
    attack: 2,
    attackRange: 1,
    attackWeapon: "sword",
    specialFloor: "forge",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Royal Guard Armor",
    monsterFamilly: "living armor",
    difficulty: 20,
    hp: 12,
    attack: 3,
    attackRange: 1,
    attackWeapon: "lance",
    specialFloor: "castle",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Cursed Halberd Armor",
    monsterFamilly: "living armor",
    difficulty: 28,
    hp: 14,
    attack: 3,
    attackRange: 2,
    attackWeapon: "halberd",
    specialFloor: "forge",
    facing: "down",
    actionPerTurn: 1
  },
]