import { newtConfigFile } from '../fileModels/config.json'
import { sdk } from '../sdk'
const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  clientId: Value.text({
    name: 'Newt ID',
    description: 'Your Pangolin client ID (provided by Pangolin dashboard)',
    required: true,
    default: null,
    patterns: [
      {
        regex: '^[a-zA-Z0-9_-]+$',
        description: 'Must be alphanumeric (can contain dash and underscore).',
      },
    ],
  }),
  clientSecret: Value.text({
    name: 'Newt Secret Key',
    description: 'Your Pangolin client secret (provided by Pangolin dashboard)',
    required: true,
    default: null,
    masked: true,
    patterns: [
      {
        regex: '^[a-zA-Z0-9_-]+$',
        description: 'Must be alphanumeric (can contain dash and underscore).',
      },
    ],
  }),
  endpoint: Value.text({
    name: 'Newt Endpoint',
    description: 'The Pangolin server endpoint URL',
    required: true,
    default: 'https://pangolin.riginode.xyz',
    patterns: [
      {
        regex: '^https?://[a-zA-Z0-9.-]+(:[0-9]+)?$',
        description: 'Must be a valid HTTP(S) URL.',
      },
    ],
  }),
})

export const configurePangolin = sdk.Action.withInput(
  // id
  'configure-pangolin',

  // metadata
  async ({ effects }) => ({
    name: 'Configure Pangolin Connection',
    description:
      'Set up your Pangolin client credentials to establish a secure WireGuard tunnel. You can obtain these credentials from your Pangolin dashboard. The service will automatically restart after saving.',
    warning: null,
    allowedStatuses: 'any',
    group: 'Configuration',
    visibility: 'enabled',
  }),

  // input spec
  inputSpec,

  // optionally pre-fill form with existing values
  async ({ effects }) => {
    const config = await newtConfigFile.read().const(effects)
    
    if (config) {
      return {
        clientId: config.clientId || '',
        clientSecret: config.clientSecret || '',
        endpoint: config.endpoint || '',
      }
    }
    
    return {
      endpoint: '',
    }
  },

  // execution function
  async ({ effects, input }) => {
    // Save configuration
    await newtConfigFile.write(effects, {
      clientId: input.clientId,
      clientSecret: input.clientSecret,
      endpoint: input.endpoint,
    })

    // Restart the service to apply changes
    await sdk.restart(effects)

    return {
      version: '1',
      title: 'Configuration Saved',
      message: `Successfully configured Newt to connect to ${input.endpoint}. The service is restarting - check the service logs to verify the connection is successful. Look for "Tunnel connection to server established successfully!" or connection error messages.`,
      result: null,
    }
  },
)
