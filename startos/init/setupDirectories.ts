import { sdk } from "../sdk";
import { mkdir } from "fs/promises";

export const setupDirectories = sdk.setupOnInit(async (effects, kind) => {
  // Create .config directory for newt's internal state
  // This needs to be created in the volume mount with proper permissions
  try {
    await mkdir("/home/newt/.config/newt-client", {
      recursive: true,
      mode: 0o755,
    });
    console.info("Created .config directory for newt");
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "EEXIST") {
      console.info(".config directory already exists");
    } else if (err.code === "EACCES") {
      console.error(
        "Permission denied creating .config directory:",
        err.message,
      );
      throw new Error("Failed to create .config directory due to permissions");
    } else {
      console.error("Failed to create .config directory:", err);
      throw error;
    }
  }
});
