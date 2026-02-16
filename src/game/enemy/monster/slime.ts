import type { Monster } from "../../../lib/type";

export const slime: Monster[] = [
  {
    name: "Green Slime",
    monsterFamilly: "slime",
    difficulty: 1,
    hp: 2,
    attack: 1,
    attackRange: 1,
    attackWeapon: "body",
    specialFloor: "slime",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Red Slime",
    monsterFamilly: "slime",
    difficulty: 5,
    hp: 4,
    attack: 2,
    attackRange: 1,
    attackWeapon: "body",
    specialFloor: "slime",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Crystal Slime",
    monsterFamilly: "slime",
    difficulty: 15,
    hp: 6,
    attack: 2,
    attackRange: 1,
    attackWeapon: "body",
    specialFloor: "slime",
    facing: "down",
    actionPerTurn: 2
  },
  {
    name: "Venom Slime",
    monsterFamilly: "slime",
    difficulty: 18,
    hp: 5,
    attack: 2,
    attackRange: 1,
    attackWeapon: "poison body",
    specialFloor: "slime",
    facing: "down",
    actionPerTurn: 1
  },
]