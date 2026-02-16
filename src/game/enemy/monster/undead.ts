import type { Monster } from "../../../lib/type";

export const undead: Monster[] = [
    {
    name: "Skeleton",
    monsterFamilly: "undead",
    difficulty: 6,
    hp: 5,
    attack: 2,
    attackRange: 1,
    attackWeapon: "sword",
    specialFloor: "crypt",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Wraith",
    monsterFamilly: "undead",
    difficulty: 18,
    hp: 6,
    attack: 3,
    attackRange: 2,
    attackWeapon: "magic",
    specialFloor: "crypt",
    facing: "down",
    actionPerTurn: 2
  },
  {
    name: "Bone Archer",
    monsterFamilly: "undead",
    difficulty: 24,
    hp: 5,
    attack: 3,
    attackRange: 5,
    attackWeapon: "bow",
    specialFloor: "crypt",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Rotting Champion",
    monsterFamilly: "undead",
    difficulty: 40,
    hp: 15,
    attack: 4,
    attackRange: 1,
    attackWeapon: "axe",
    specialFloor: "crypt",
    facing: "down",
    actionPerTurn: 1
  },
]