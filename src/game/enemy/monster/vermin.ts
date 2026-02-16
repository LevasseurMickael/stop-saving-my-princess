import type { Monster } from "../../../lib/type";

export const vermin: Monster[] = [
    {
    name: "Cave Rat",
    monsterFamilly: "vermin",
    difficulty: 3,
    hp: 2,
    attack: 1,
    attackRange: 1,
    attackWeapon: "bite",
    specialFloor: "rat",
    facing: "down",
    actionPerTurn: 2
  },
  {
    name: "Shadow Bat",
    monsterFamilly: "vermin",
    difficulty: 10,
    hp: 3,
    attack: 1,
    attackRange: 1,
    attackWeapon: "bite",
    specialFloor: "dark",
    facing: "down",
    actionPerTurn: 3
  },
  {
    name: "Fire Beetle",
    monsterFamilly: "vermin",
    difficulty: 20,
    hp: 4,
    attack: 3,
    attackRange: 1,
    attackWeapon: "burn",
    specialFloor: "lava",
    facing: "down",
    actionPerTurn: 2
  },
  {
    name: "Tunnel Spider",
    monsterFamilly: "vermin",
    difficulty: 25,
    hp: 6,
    attack: 2,
    attackRange: 2,
    attackWeapon: "web",
    specialFloor: "cave",
    facing: "down",
    actionPerTurn: 2
  },
]