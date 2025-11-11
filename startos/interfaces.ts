import { sdk } from "./sdk";

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  // Newt doesn't expose any user-facing network interfaces
  // The metrics endpoint (port 2112) is for internal monitoring only
  // Users can check connection status via:
  // 1. Service health indicator (configured in main.ts)
  // 2. "Connection Status" action
  // 3. Service logs
  return [];
});

