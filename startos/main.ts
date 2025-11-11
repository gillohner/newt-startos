import { sdk } from "./sdk";
import { metricsPort } from "./utils";
import { newtConfigFile } from "./fileModels/config.json";

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info("Starting Newt!");

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  const daemons = await sdk.Daemons.of(effects, started)
    .addDaemon("primary", async () => {
      const subcontainer = await sdk.SubContainer.of(
        effects,
        { imageId: "main" },
        sdk.Mounts.of().mountVolume({
          volumeId: "main",
          subpath: null,
          mountpoint: "/home/newt",
          readonly: false,
        }),
        "newt-sub",
      );

      return {
        subcontainer,
        exec: {
          command: ["/usr/local/bin/start-newt.sh"] as [string, ...string[]],
          environment: {
            METRICS_PORT: String(metricsPort),
          },
        },
        ready: {
          display: "Newt Service",
          fn: async () => {
            // Check if metrics port is listening (indicates newt is running)
            const portCheck = await sdk.healthCheck.checkPortListening(
              effects,
              metricsPort,
              {
                successMessage: "Newt is running",
                errorMessage: "Newt is starting",
              },
            );

            return portCheck;
          },
        },
        requires: [],
      };
    });

  return daemons.addHealthCheck("connection-status", {
    ready: {
      display: "Pangolin Connection",
      fn: async () => {
        try {
          const config = await newtConfigFile.read().const(effects);

          if (
            !config || !config.clientId || !config.clientSecret ||
            !config.endpoint
          ) {
            return {
              message:
                "Not Configured - Use 'Configure Pangolin Connection' action",
              result: "failure" as const,
            };
          }

          // Newt stays running even if connection fails, so we can't detect
          // connection errors here. Users should check logs for actual status.
          return {
            message:
              `Configured for ${config.endpoint} - Check logs for connection status`,
            result: "success" as const,
          };
        } catch (error) {
          return {
            message: "Checking configuration...",
            result: "starting" as const,
          };
        }
      },
    },
    requires: ["primary"],
  });
});
