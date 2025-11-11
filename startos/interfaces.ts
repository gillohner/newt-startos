import { sdk } from "./sdk";

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  // No user-facing interfaces for Newt
  // Metrics are exposed on port 2112 for Prometheus scraping only
  return [];
});
