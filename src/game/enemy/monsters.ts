import type { Monster } from "../../lib/type";
import { ghost } from "./monster/ghost";
import { livingArmor } from "./monster/livingArmor";
import { mage } from "./monster/mage";
import { royalForce } from "./monster/royalForce";
import { slime } from "./monster/slime";
import { undead } from "./monster/undead";
import { vermin } from "./monster/vermin";

export const monsters: Monster[] = slime.concat(ghost, vermin, livingArmor, undead, mage, royalForce);
