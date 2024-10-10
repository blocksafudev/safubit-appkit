import { type CaipNetwork } from '@safubit/appkit-common'
import { solana, solanaDevnet, solanaTestnet } from '@safubit/appkit/networks'

export const solanaChains = {
  'solana:mainnet': solana,
  'solana:testnet': solanaTestnet,
  'solana:devnet': solanaDevnet
} as Record<`${string}:${string}`, CaipNetwork>
