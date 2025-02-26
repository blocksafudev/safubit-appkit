import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@safubit/appkit-adapter-wagmi'
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
  type AppKitNetwork
} from '@safubit/appkit/networks'

export const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum, avalanche, base, optimism, polygon] as [
  AppKitNetwork,
  ...AppKitNetwork[]
]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig
