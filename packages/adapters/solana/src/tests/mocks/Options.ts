import type { AppKitOptions, ChainAdapter } from '@safubit/appkit'
import { solana } from '@safubit/appkit/networks'

export const mockOptions: AppKitOptions = {
  projectId: 'test-project-id',
  adapters: [{ chainNamespace: 'solana' } as unknown as ChainAdapter],
  networks: [solana],
  metadata: {
    name: 'Test App',
    description: 'Test App Description',
    url: 'https://test-app.com',
    icons: ['https://test-app.com/icon.png']
  }
} as unknown as AppKitOptions
