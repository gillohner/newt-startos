import { VersionInfo } from "@start9labs/start-sdk";

export const v_0_1_0_0 = VersionInfo.of({
  version: "0.1.0:0",
  releaseNotes: "Initial release of Newt for StartOS",
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
});
