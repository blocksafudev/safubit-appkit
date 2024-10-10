import { useSnapshot } from 'valtio'
import { SolStoreUtil } from '../src/utils/SolanaStoreUtil.js'
import type { Connection } from '@safubit/appkit-utils/solana'

// -- Types -----------------------------------------------------------
export * from '@safubit/appkit-utils/solana'

// -- Source -----------------------------------------------------------
export * from '../src/index.js'

// -- Hooks -----------------------------------------------------------
export function useAppKitConnection(): {
  connection: Connection | undefined
} {
  const state = useSnapshot(SolStoreUtil.state)

  return {
    connection: state.connection
  } as {
    connection: Connection | undefined
  }
}
