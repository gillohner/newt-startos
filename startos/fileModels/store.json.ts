import { FileHelper, matches } from "@start9labs/start-sdk";

const { object, string, boolean } = matches;

export type StoreModel = {
  configured?: boolean;
  lastConnected?: string;
  lastConnectionAttempt?: string;
};

const shape = object({
  configured: boolean.optional(),
  lastConnected: string.optional(),
  lastConnectionAttempt: string.optional(),
});

export const storeFile = FileHelper.json(
  {
    volumeId: "main",
    subpath: "/store.json",
  },
  shape,
);
