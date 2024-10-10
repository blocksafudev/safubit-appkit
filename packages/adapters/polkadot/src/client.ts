import type {
  AppKitOptions,
  ConnectionControllerClient,
  NetworkControllerClient
} from '@safubit/appkit'
import type { AdapterType, CaipNetwork, ChainNamespace } from '@safubit/appkit-common'
import { ConstantsUtil as CommonConstantsUtil } from '@safubit/appkit-common'

export class PolkadotClient {
  // Metadata
  public adapterType: AdapterType = 'polkadot'
  public chainNamespace: ChainNamespace = CommonConstantsUtil.CHAIN.POLKADOT

  // Adapter
  public options: AppKitOptions | undefined = undefined
  public networkControllerClient: NetworkControllerClient | undefined = undefined
  public connectionControllerClient: ConnectionControllerClient | undefined = undefined
  public defaultCaipNetwork: CaipNetwork | undefined = undefined
}
