import type { Meta } from '@storybook/web-components'
import '@safubit/appkit-ui/src/components/wui-loading-hexagon'
import type { WuiLoadingHexagon } from '@safubit/appkit-ui/src/components/wui-loading-hexagon'
import { html } from 'lit'

type Component = Meta<WuiLoadingHexagon>

export default {
  title: 'Components/wui-loading-hexagon'
} as Component

export const Default: Component = {
  render: () => html` <wui-loading-hexagon></wui-loading-hexagon>`
}
