import { createAppKit } from '@safubit/appkit/react'
import { EthersAdapter } from '@safubit/appkit-adapter-ethers'
import { SiweData } from '../../components/Siwe/SiweData'
import { EthersTests } from '../../components/Ethers/EthersTests'
import { AppKitButtons } from '../../components/AppKitButtons'
import { ThemeStore } from '../../utils/StoreUtil'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { siweConfig } from '../../utils/SiweUtils'
import { EthersModalInfo } from '../../components/Ethers/EthersModalInfo'
import { mainnet } from '@safubit/appkit/networks'

const networks = ConstantsUtil.EvmNetworks

const ethersAdapter = new EthersAdapter()

const modal = createAppKit({
  adapters: [ethersAdapter],
  networks,
  defaultNetwork: mainnet,
  projectId: ConstantsUtil.ProjectId,
  features: {
    analytics: true
  },
  siweConfig,
  customWallets: ConstantsUtil.CustomWallets
})

ThemeStore.setModal(modal)

export default function EthersSiwe() {
  return (
    <>
      <AppKitButtons />
      <EthersModalInfo />
      <SiweData />
      <EthersTests />
    </>
  )
}
