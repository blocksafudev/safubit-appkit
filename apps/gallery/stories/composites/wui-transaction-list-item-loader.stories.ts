import type { Meta } from '@storybook/web-components'
import '@safubit/appkit-ui/src/composites/wui-transaction-list-item-loader'
import type { WuiTransactionListItemLoader } from '@safubit/appkit-ui/src/composites/wui-transaction-list-item-loader'
import { html } from 'lit'
import '../../components/gallery-container'

type Component = Meta<WuiTransactionListItemLoader>

export default {
  title: 'Composites/wui-transaction-list-item-loader'
} as Component

export const Default: Component = {
  render: () =>
    html` <gallery-container width="336">
      <wui-transaction-list-item-loader></wui-transaction-list-item-loader>
    </gallery-container>`
}
