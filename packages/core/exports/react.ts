import { useSnapshot } from 'valtio'
import { AccountController } from '../src/controllers/AccountController.js'
import { CoreHelperUtil } from '../src/utils/CoreHelperUtil.js'
import { ChainController } from '../src/controllers/ChainController.js'
import type { CaipNetwork, CaipNetworkId } from '@safubit/appkit-common'

// -- Hooks ------------------------------------------------------------
export function useAppKitNetwork(): {
  caipNetwork: CaipNetwork | undefined
  chainId: number | string | undefined
  caipNetworkId: CaipNetworkId | undefined
} {
  const { activeCaipNetwork } = useSnapshot(ChainController.state)

  return {
    caipNetwork: activeCaipNetwork,
    chainId: activeCaipNetwork?.id,
    caipNetworkId: activeCaipNetwork?.caipNetworkId
  }
}

export function useAppKitAccount() {
  const { status } = useSnapshot(AccountController.state)
  const { activeCaipAddress } = useSnapshot(ChainController.state)

  return {
    caipAddress: activeCaipAddress,
    address: CoreHelperUtil.getPlainAddress(activeCaipAddress),
    isConnected: Boolean(activeCaipAddress),
    status
  }
}
