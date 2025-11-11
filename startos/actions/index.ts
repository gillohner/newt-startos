import { sdk } from "../sdk";
import { configurePangolin } from "./configurePangolin";

export const actions = sdk.Actions.of()
  .addAction(configurePangolin);
