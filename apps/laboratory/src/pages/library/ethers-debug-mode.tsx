import { EthersTests } from '../../components/Ethers/EthersTests'
import { AppKitButtons } from '../../components/AppKitButtons'
import { createAppKit } from '@safubit/appkit/react'
import { ThemeStore } from '../../utils/StoreUtil'
import { EthersModalInfo } from '../../components/Ethers/EthersModalInfo'
import { EthersAdapter } from '@safubit/appkit-adapter-ethers'
import { siweConfig } from '../../utils/SiweUtils'
import { mainnet } from '@safubit/appkit/networks'
import { ConstantsUtil } from '../../utils/ConstantsUtil'

const networks = ConstantsUtil.EvmNetworks

const ethersAdapter = new EthersAdapter()

const modal = createAppKit({
  adapters: [ethersAdapter],
  networks,
  defaultNetwork: mainnet,
  projectId: '',
  features: {
    analytics: true,
    socials: []
  },
  siweConfig,
  debug: true
})

ThemeStore.setModal(modal)

export default function Ethers() {
  return (
    <>
      <AppKitButtons />
      <EthersModalInfo />
      <EthersTests />
    </>
  )
}
