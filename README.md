<p align="center">
  <img src="icon.png" alt="Newt Logo" width="21%">
</p>

## Newt for StartOS

A WireGuard tunnel client for Pangolin on StartOS.

**Newt** is a fully userspace WireGuard tunnel client and TCP/UDP proxy that
securely exposes private resources controlled by
[Pangolin](https://pangolin.net/). This repository creates the `.s9pk` package
that is installed to run Newt on
[StartOS](https://github.com/Start9Labs/start-os/).

## WARNING: Development Configurations

At the moment we are not using StartOS Actions to manage Newt's configuration.
Instead, configuration must be done manually by editing the `config.json` file
in the service volume after installation.

## Prerequisites

To use Newt, you must have:

- A [Pangolin](https://pangolin.net/) account and server
- Pangolin resource credentials (ID, Secret, Endpoint)

See the [Pangolin Documentation](https://docs.pangolin.net/) for setup
instructions.

## Building from source

1. Set up your
   [environment](https://docs.start9.com/latest/developer-docs/packaging).

1. Clone this repository and `cd` into it.

1. Run `npm install` to install dependencies.

1. Run `make` to build the package.

1. The resulting `.s9pk` can be sideloaded into StartOS.

## Installing on StartOS

### Via Start CLI

```bash
start-cli auth login
start-cli --host https://server-name.local package install newt.s9pk
```

### Via Sideload

1. Go to **System** > **Sideload Service**
2. Upload the `newt.s9pk` file

## Configuration

After installation:

1. Create a resource in your Pangolin dashboard to get credentials
2. Configure Newt by editing the `config.json` file in the service volume:
   ```json
   {
     "clientId": "your-client-id-from-pangolin",
     "secret": "your-secret-from-pangolin",
     "endpoint": "https://your-pangolin-server.com",
     "acceptClients": false,
     "native": false,
     "logLevel": "info"
   }
   ```
3. Restart the Newt service for changes to take effect

Full instructions are available in the service's **Instructions** tab in
StartOS.

## Upstream

- **Newt**: [github.com/fosrl/newt](https://github.com/fosrl/newt)
- **Pangolin**: [pangolin.net](https://pangolin.net/)
- **Documentation**: [docs.pangolin.net](https://docs.pangolin.net/)
