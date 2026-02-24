import type { Direction } from "../../lib/type";
import { statePlayer } from "../state";

// Calculate attack offset based on player's facing direction
export function getAttackOffset(facing: Direction) {
  switch (facing) {
    case "up":
      return {
        dx: 0,
        dy: -1,
        behindx: 0,
        behindy: 1,
        aoe: areaDamageOnAttack(facing),
      };
    case "down":
      return {
        dx: 0,
        dy: 1,
        behindx: 0,
        behindy: -1,
        aoe: areaDamageOnAttack(facing),
      };
    case "left":
      return {
        dx: -1,
        dy: 0,
        behindx: 1,
        behindy: 0,
        aoe: areaDamageOnAttack(facing),
      };
    case "right":
      return {
        dx: 1,
        dy: 0,
        behindx: -1,
        behindy: 0,
        aoe: areaDamageOnAttack(facing),
      };
  }
}

function areaDamageOnAttack(facing: Direction): { dx: number; dy: number }[] {
  const aoeUp = [
    { dx: 0, dy: -1 },
    { dx: -1, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: 0, dy: -2 },
  ];
  const aoeUpExtended = [
    { dx: -1, dy: -2 },
    { dx: 1, dy: -2 },
    { dx: 0, dy: -3 },
  ];
  const aoeDown = [
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: 2 },
  ];
  const aoeDownExtended = [
    { dx: -1, dy: 2 },
    { dx: 1, dy: 2 },
    { dx: 0, dy: 3 },
  ];
  const aoeLeft = [
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -2, dy: 0 },
  ];
  const aoeLeftExtended = [
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -3, dy: 0 },
  ];
  const aoeRight = [
    { dx: 1, dy: 0 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 1 },
    { dx: 2, dy: 0 },
  ];
  const aoeRightExtended = [
    { dx: 2, dy: -1 },
    { dx: 2, dy: 1 },
    { dx: 3, dy: 0 },
  ];

  const extended = statePlayer.stat.attackRange > 1;

  switch (facing) {
    case "up":
      return extended ? [...aoeUp, ...aoeUpExtended] : aoeUp;
    case "down":
      return extended ? [...aoeDown, ...aoeDownExtended] : aoeDown;
    case "left":
      return extended ? [...aoeLeft, ...aoeLeftExtended] : aoeLeft;
    case "right":
      return extended ? [...aoeRight, ...aoeRightExtended] : aoeRight;
  }
}
