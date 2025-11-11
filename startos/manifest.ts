import { setupManifest } from "@start9labs/start-sdk";

const BUILD = process.env.BUILD || "";

const architectures = BUILD === "x86_64" || BUILD === "aarch64"
  ? [BUILD]
  : ["x86_64", "aarch64"];

export const manifest = setupManifest({
  id: "newt",
  title: "Newt",
  license: "AGPL-3.0",
  wrapperRepo: "https://github.com/gillohner/newt-startos",
  upstreamRepo: "https://github.com/fosrl/newt",
  supportSite: "https://docs.pangolin.net/",
  marketingSite: "https://pangolin.net/",
  donationUrl: null, // TODO: add donation URL
  docsUrl:
    "https://github.com/gillohner/newt-startos/blob/master/docs/instructions.md",
  description: {
    short: "WireGuard tunnel client for Pangolin",
    long:
      "Newt is a fully userspace WireGuard tunnel client and TCP/UDP proxy that securely exposes private resources controlled by Pangolin. It enables secure access to your services without managing complex WireGuard configurations.",
  },
  volumes: ["main"],
  images: {
    main: {
      source: { dockerBuild: {} },
    },
  },
  hardwareRequirements: {
    arch: architectures,
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
});
