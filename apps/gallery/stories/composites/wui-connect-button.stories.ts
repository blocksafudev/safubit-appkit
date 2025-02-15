import type { Meta } from '@storybook/web-components'
import '@safubit/appkit-ui/src/composites/wui-connect-button'
import type { WuiConnectButton } from '@safubit/appkit-ui/src/composites/wui-connect-button'
import { html } from 'lit'

type Component = Meta<WuiConnectButton>

export default {
  title: 'Composites/wui-connect-button',
  args: {
    size: 'md',
    loading: false
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' }
    },
    loading: {
      control: { type: 'boolean' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`
    <wui-connect-button size=${args.size} ?loading=${args.loading}>
      ${args.loading ? 'Connecting...' : 'Connect Wallet'}
    </wui-connect-button>
  `
}
