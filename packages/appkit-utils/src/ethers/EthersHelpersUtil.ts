import type { CaipNetwork } from '@safubit/appkit-common'
import { PresetsUtil } from '../PresetsUtil.js'
import type { Provider } from './EthersTypesUtil.js'

export const EthersHelpersUtil = {
  hexStringToNumber(value: string) {
    const string = value.startsWith('0x') ? value.slice(2) : value
    const number = parseInt(string, 16)

    return number
  },
  numberToHexString(value: number | string) {
    return `0x${value.toString(16)}`
  },
  async getUserInfo(provider: Provider) {
    const [addresses, chainId] = await Promise.all([
      EthersHelpersUtil.getAddresses(provider),
      EthersHelpersUtil.getChainId(provider)
    ])

    return { chainId, addresses }
  },
  async getChainId(provider: Provider) {
    const chainId = await provider.request<string | number>({ method: 'eth_chainId' })

    return Number(chainId)
  },
  async getAddress(provider: Provider) {
    const [address] = await provider.request<string[]>({ method: 'eth_accounts' })

    return address
  },
  async getAddresses(provider: Provider) {
    const addresses = await provider.request<string[]>({ method: 'eth_accounts' })

    return addresses
  },
  async addEthereumChain(provider: Provider, caipNetwork: CaipNetwork) {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: EthersHelpersUtil.numberToHexString(caipNetwork.id),
          rpcUrls: caipNetwork.rpcUrls.default.http,
          chainName: caipNetwork.name,
          nativeCurrency: caipNetwork.nativeCurrency,
          blockExplorerUrls: caipNetwork.blockExplorers,
          iconUrls: [PresetsUtil.NetworkImageIds[caipNetwork.id]]
        }
      ]
    })
  }
}
