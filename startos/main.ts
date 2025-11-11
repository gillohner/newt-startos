import { sdk } from "./sdk";
import { metricsPort } from "./utils";

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
  return sdk.Daemons.of(effects, started).addDaemon("primary", async () => {
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

    // Environment variables for Newt configuration
    const environment: Record<string, string> = {
      RUST_LOG: "info",
      NEWT_ID: "skul6zhqattftd1",
      NEWT_SECRET: "fkd3msluh4xs2fhhf4h3z787hln45hd1xxtpqkbhh7jemgyd",
      PANGOLIN_ENDPOINT: "https://pangolin.riginode.xyz",
      LOG_LEVEL: "info",
    };

    return {
      subcontainer,
      exec: {
        command: ["/usr/local/bin/start-newt.sh"] as [string, ...string[]],
        environment,
      },
      ready: {
        display: "Newt Connection",
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, metricsPort, {
            successMessage: "Newt is running and metrics endpoint is available",
            errorMessage: "Newt metrics endpoint is not available",
          }),
      },
      requires: [],
    };
  });
});
