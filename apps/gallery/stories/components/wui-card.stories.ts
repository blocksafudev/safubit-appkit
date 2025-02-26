import type { Meta } from '@storybook/web-components'
import '@safubit/appkit-ui/src/components/wui-card'
import type { WuiCard } from '@safubit/appkit-ui/src/components/wui-card'
import { html } from 'lit'
import '../../components/gallery-placeholder'

type Component = Meta<WuiCard>

export default {
  title: 'Components/wui-card'
} as Component

export const Default: Component = {
  render: () => html`
    <wui-card>
      <gallery-placeholder size="lg" margin background="blue"></gallery-placeholder>
    </wui-card>
  `
}
