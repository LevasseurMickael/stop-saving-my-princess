import type { SecretItem } from "../../../../lib/type";
import { items_41_to_50 } from "./floor_fifty";
import { items_31_to_40 } from "./floor_forty";
import { items_1_to_10 } from "./floor_ten";
import { items_21_to_30 } from "./floor_thirty";
import { items_11_to_20 } from "./floor_twenty";

export const allSecretItems: SecretItem[] = items_1_to_10.concat(items_11_to_20, items_21_to_30, items_31_to_40, items_41_to_50);