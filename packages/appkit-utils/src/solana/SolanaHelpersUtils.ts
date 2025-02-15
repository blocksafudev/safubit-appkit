import type { CaipNetwork } from '@safubit/appkit-common'
import { ConstantsUtil as CommonConstantsUtil } from '@safubit/appkit-common'

import { SolConstantsUtil } from './SolanaConstantsUtil.js'
import type { Provider } from './SolanaTypesUtil.js'

const NetworkImageIds = {
  '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'a1b58899-f671-4276-6a5e-56ca5bd59700',
  '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z': 'a1b58899-f671-4276-6a5e-56ca5bd59700',
  EtWTRABZaYq6iMfeYKouRu166VU2xqa1: 'a1b58899-f671-4276-6a5e-56ca5bd59700'
} as Record<string, string>

export const SolHelpersUtil = {
  detectRpcUrl(chain: CaipNetwork, projectId: string) {
    if (
      chain.rpcUrls.default.http[0]?.includes(
        new URL(CommonConstantsUtil.BLOCKCHAIN_API_RPC_URL).hostname
      )
    ) {
      return `${chain.rpcUrls.default.http[0]}?chainId=solana:${chain.id}&projectId=${projectId}`
    }

    return chain.rpcUrls.default.http[0]
  },

  getChain(chains: CaipNetwork[], chainId: string | null) {
    const chain = chains.find(lChain => lChain.id === chainId)

    if (chain) {
      return chain
    }

    return SolConstantsUtil.DEFAULT_CHAIN
  },

  getChainFromCaip(chains: CaipNetwork[], chainCaipId: string | undefined | null = ':') {
    const chainId: string = (chainCaipId?.split(':')[1] ?? '').replace(/\s/gu, '')

    const selectedChain = chains.find(chain => chain.id === chainId)

    if (selectedChain) {
      return {
        ...selectedChain,
        id: `solana:${chainId}`,
        imageId: NetworkImageIds[chainId],
        chainNamespace: CommonConstantsUtil.CHAIN.SOLANA
      } as CaipNetwork
    }

    return {
      ...SolConstantsUtil.DEFAULT_CHAIN,
      id: `solana:${chainId}`,
      imageId: NetworkImageIds[chainId],
      chainNamespace: CommonConstantsUtil.CHAIN.SOLANA
    } as CaipNetwork
  },

  hexStringToNumber(value: string) {
    const hexString = value.startsWith('0x') ? value.slice(2) : value
    const decimalValue = parseInt(hexString, 16)

    return decimalValue
  },

  getAddress(provider: Provider) {
    const address = provider.publicKey?.toBase58()

    return address
  }
}
