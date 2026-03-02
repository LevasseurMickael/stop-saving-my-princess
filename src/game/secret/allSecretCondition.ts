import type { FloorSecret } from "../../lib/type";
import { floorToTenConditions } from "./secretCondition/secret_floor-ten";
import { floorToFiftyConditions } from "./secretCondition/secret_floor_fifty";
import { floorToFortyConditions } from "./secretCondition/secret_floor_forty";
import { floorToThirtyConditions } from "./secretCondition/secret_floor_thirty";
import { floorToTwentyConditions } from "./secretCondition/secret_floor_twenty";

export const allSecretConditions: FloorSecret[] = floorToTenConditions.concat(
  floorToTwentyConditions,
  floorToThirtyConditions,
  floorToFortyConditions,
  floorToFiftyConditions,
);
