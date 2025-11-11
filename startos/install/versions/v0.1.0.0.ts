import { VersionInfo } from "@start9labs/start-sdk";

export const v_0_1_0_0 = VersionInfo.of({
  version: "0.1.0:0",
  releaseNotes: `Initial release of Newt for StartOS

Features:
- Action-based configuration for Pangolin connection
- Secure credential storage (Client ID, Secret, Endpoint)
- Automatic service restart after configuration
- Health monitoring for service status and connection state
- WireGuard tunnel establishment to Pangolin
- Prometheus metrics endpoint for monitoring
- Comprehensive logging for troubleshooting

Requirements:
- Active Pangolin instance
- Newt client credentials from Pangolin dashboard

Configuration:
Use the "Configure Pangolin Connection" action to set up your credentials.`,
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
});
