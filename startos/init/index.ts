import { sdk } from "../sdk";
import { setDependencies } from "../dependencies";
import { setInterfaces } from "../interfaces";
import { versionGraph } from "../install/versionGraph";
import { actions } from "../actions";
import { restoreInit } from "../backups";
import { setupDirectories } from "./setupDirectories";
import { taskCheckConfig } from "./taskCheckConfig";

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  setupDirectories,
  taskCheckConfig,
);

export const uninit = sdk.setupUninit(versionGraph);
