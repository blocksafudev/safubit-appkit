import React from 'react'
import { createAppKit } from '@safubit/appkit/react'
import { WagmiAdapter } from '@safubit/appkit-adapter-wagmi'
import { SolanaAdapter } from '@safubit/appkit-adapter-solana/react'
import { ThemeStore } from '../../utils/StoreUtil'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { mainnet } from '@safubit/appkit/networks'
import { AppKitButtons } from '../../components/AppKitButtons'
import { HuobiWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { MultiChainTestsWagmiSolana } from '../../components/MultiChainTestsWagmiSolana'
import { siweConfig } from '../../utils/SiweUtils'
import { SiweData } from '../../components/Siwe/SiweData'

const queryClient = new QueryClient()

const networks = ConstantsUtil.AllNetworks

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId: ConstantsUtil.ProjectId
})

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new HuobiWalletAdapter(), new SolflareWalletAdapter()]
})

const modal = createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks,
  defaultNetwork: mainnet,
  projectId: ConstantsUtil.ProjectId,
  features: {
    analytics: true
  },
  metadata: ConstantsUtil.Metadata,
  siweConfig
})

ThemeStore.setModal(modal)

export default function MultiChainWagmiSolana() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitButtons />
        <SiweData />
        <MultiChainTestsWagmiSolana />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
