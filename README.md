<p align="center">
  <img src="icon.png" alt="Newt Logo" width="21%">
</p>

# Newt for StartOS

This repository packages [Newt](https://github.com/fosrl/newt) for StartOS.

Newt is a fully userspace WireGuard tunnel client and TCP/UDP proxy that securely exposes private resources controlled by [Pangolin](https://pangolin.net/).

## Dependencies

- **Pangolin Instance**: You must have a [Pangolin](https://pangolin.net/) instance or dashboard access to another instance to obtain client credentials. See [Pangolin Documentation](https://docs.pangolin.net/) for account setup.

## Documentation

Service documentation can be found in the [docs](./docs) directory.

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
