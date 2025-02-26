import { customElement } from '@safubit/appkit-ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'
import { RouterController, type WalletGuideType } from '@safubit/appkit-core'
import { property } from 'lit/decorators.js'

@customElement('w3m-wallet-guide')
export class W3mWalletGuide extends LitElement {
  public static override styles = styles

  // -- State & Properties -------------------------------- //
  @property() public walletGuide: WalletGuideType = 'get-started'

  // -- Render -------------------------------------------- //
  public override render() {
    return this.walletGuide === 'explore'
      ? html`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://explorer.walletconnect.com"
              title="Visit our Explorer"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`
      : html`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
          >
            Get started
          </wui-link>
        </wui-flex>`
  }

  // -- Private ------------------------------------------- //
  private onGetStarted() {
    RouterController.push('Create')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-wallet-guide': W3mWalletGuide
  }
}
