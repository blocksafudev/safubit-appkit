import { Ethers5Adapter } from '@safubit/appkit-adapter-ethers5'
import {
  createAppKit,
  useAppKit,
  useAppKitEvents,
  useAppKitState,
  useAppKitTheme
} from '@safubit/appkit/react'
import { mainnet, arbitrum } from '@safubit/appkit/networks'

// @ts-expect-error 1. Get projectId
const projectId = import.meta.env.VITE_PROJECT_ID
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// 2. Set Ethers adapter
const ethers5Adapter = new Ethers5Adapter()

// 3. Create modal
createAppKit({
  adapters: [ethers5Adapter],
  metadata: {
    name: 'AppKit',
    description: 'AppKit Laboratory',
    url: 'https://example.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  networks: [mainnet, arbitrum],
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})

export default function App() {
  // 4. Use modal hook
  const modal = useAppKit()
  const state = useAppKitState()
  const { themeMode, themeVariables, setThemeMode } = useAppKitTheme()
  const events = useAppKitEvents()

  return (
    <>
      <w3m-button />
      <w3m-network-button />
      <w3m-connect-button />
      <w3m-account-button />

      <button onClick={() => modal.open()}>Connect Wallet</button>
      <button onClick={() => modal.open({ view: 'Networks' })}>Choose Network</button>
      <button onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme Mode
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify({ themeMode, themeVariables }, null, 2)}</pre>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </>
  )
}
