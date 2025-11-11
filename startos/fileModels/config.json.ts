import { FileHelper, matches } from '@start9labs/start-sdk'

const { object, string } = matches

export const shape = object({
  clientId: string.optional(),
  clientSecret: string.optional(),
  endpoint: string.optional(),
})

export const newtConfigFile = FileHelper.json(
  {
    volumeId: 'main',
    subpath: '/config.json',
  },
  shape,
)
