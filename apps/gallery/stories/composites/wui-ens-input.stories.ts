import type { Meta } from '@storybook/web-components'
import '@safubit/appkit-ui/src/composites/wui-ens-input'
import type { WuiEnsInput } from '@safubit/appkit-ui'
import { html } from 'lit'
import '../../components/gallery-container'

type Component = Meta<WuiEnsInput>

export default {
  title: 'Composites/wui-ens-input',
  args: {
    errorMessage: '',
    disabled: false
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<gallery-container width="336"
      ><wui-ens-input .errorMessage=${args.errorMessage} .disabled=${args.disabled}></wui-ens-input
    ></gallery-container>`
}
