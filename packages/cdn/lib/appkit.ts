/**
 * Due to some limitations on exporting multiple modules with UMD, we needed to export all of our modules in this file.
 * For now exporting only Wagmi and Solana adapters. Until we found a better workaround and need other adapters, we can keep it this way.
 */
import '@safubit/appkit-polyfills'
import { createAppKit } from '@safubit/appkit'
import { WagmiAdapter } from '@safubit/appkit-adapter-wagmi'
import { SolanaAdapter } from '@safubit/appkit-adapter-solana'
import * as AppKitNetworks from '@safubit/appkit/networks'

const networks = AppKitNetworks

export { createAppKit, networks, WagmiAdapter, SolanaAdapter }

declare global {
  interface Window {
    AppKit: {
      createAppKit: typeof createAppKit
      WagmiAdapter: typeof WagmiAdapter
      SolanaAdapter: typeof SolanaAdapter
      networks: typeof AppKitNetworks
    }
  }
}

// Assign to window.AppKit
if (typeof window !== 'undefined') {
  window.AppKit = {
    createAppKit,
    WagmiAdapter,
    SolanaAdapter,
    networks: AppKitNetworks
  }
}
