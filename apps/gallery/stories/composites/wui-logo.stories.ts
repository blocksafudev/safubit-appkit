import type { Meta } from '@storybook/web-components'
import '@safubit/appkit-ui/src/composites/wui-logo'
import type { WuiLogo } from '@safubit/appkit-ui/src/composites/wui-logo'
import { html } from 'lit'
import { logoOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiLogo>

export default {
  title: 'Composites/wui-logo',
  args: {
    logo: 'google'
  },

  argTypes: {
    logo: {
      options: logoOptions,
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`<wui-logo logo=${args.logo}></wui-logo>`
}
