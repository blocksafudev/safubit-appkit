import { createAppKit } from '@safubit/appkit/react'
import { SolanaAdapter } from '@safubit/appkit-adapter-solana/react'

import { ThemeStore } from '../../utils/StoreUtil'
import { AppKitButtons } from '../../components/AppKitButtons'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { SolanaTests } from '../../components/Solana/SolanaTests'
import { HuobiWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { solana } from '@safubit/appkit/networks'

const networks = ConstantsUtil.SolanaNetworks

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new HuobiWalletAdapter(), new SolflareWalletAdapter()]
})

const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks,
  defaultNetwork: solana,
  projectId: ConstantsUtil.ProjectId,
  metadata: ConstantsUtil.Metadata,
  features: {
    socials: [],
    emailShowWallets: false
  }
})

ThemeStore.setModal(modal)

export default function Solana() {
  return (
    <>
      <AppKitButtons />
      <SolanaTests />
    </>
  )
}
