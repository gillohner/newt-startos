import { configurePangolin } from "../actions/configurePangolin";
import { newtConfigFile } from "../fileModels/config.json";
import { sdk } from "../sdk";

export const taskCheckConfig = sdk.setupOnInit(async (effects, kind) => {
  const config = await newtConfigFile.read().const(effects);

  if (!config || !config.clientId || !config.clientSecret || !config.endpoint) {
    await sdk.action.createOwnTask(effects, configurePangolin, "important", {
      reason:
        'Pangolin credentials not configured. Use the "Configure Pangolin Connection" action to set up your Newt tunnel.',
    });
  }
});
