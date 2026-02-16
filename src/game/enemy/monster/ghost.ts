import type { Monster } from "../../../lib/type";

export const ghost: Monster[] = [
    {
    name: "Lost Spirit",
    monsterFamilly: "ghost",
    difficulty: 14,
    hp: 4,
    attack: 2,
    attackRange: 2,
    attackWeapon: "magic",
    specialFloor: "haunted",
    facing: "down",
    actionPerTurn: 1
  },
  {
    name: "Crying Specter",
    monsterFamilly: "ghost",
    difficulty: 22,
    hp: 6,
    attack: 3,
    attackRange: 3,
    attackWeapon: "magic",
    specialFloor: "haunted",
    facing: "down",
    actionPerTurn: 2
  },
  {
    name: "Phantom Knight",
    monsterFamilly: "ghost",
    difficulty: 35,
    hp: 10,
    attack: 3,
    attackRange: 1,
    attackWeapon: "spectral blade",
    specialFloor: "haunted",
    facing: "down",
    actionPerTurn: 1
  },
]