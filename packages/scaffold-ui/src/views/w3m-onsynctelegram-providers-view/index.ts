import {
  CoreHelperUtil,
  AccountController,
  ConstantsUtil,
  OnRampController,
  type OnRampProvider,
  RouterController,
  BlockchainApiController,
  EventsController,
  ChainController
} from '@safubit/appkit-core'

import { customElement } from '@safubit/appkit-ui'
import { LitElement, html } from 'lit'
import { state } from 'lit/decorators.js'
import type { CoinbasePaySDKChainNameValues } from '@safubit/appkit-core'
import { W3mFrameRpcConstants } from '@safubit/appkit-wallet'

@customElement('w3m-onsynctelegram-providers-view')
export class W3mOnSyncTelegramProvidersView extends LitElement {



  public constructor() {
    super()
  }


  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
       <wui-flex
        .padding=${['m', 's', 's', 's'] as const}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          Here, you will create OTP for your wallet for sync with Telegram.  
        </wui-text>

      </wui-flex>
    `
  }

  // -- Private ------------------------------------------- //
  private onRampProvidersTemplate() {
    return html`
    <div>
    <w3m-onsynctelegram-provider-item
      label="Generate OTP"
      name="Generate OTP"
      
    ></w3m-onsynctelegram-provider-item>
    </div>
  `
  }

 

}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-onsynctelegram-providers-view': W3mOnSyncTelegramProvidersView
  }
}
