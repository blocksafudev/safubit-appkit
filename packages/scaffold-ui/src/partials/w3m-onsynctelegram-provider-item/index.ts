import { html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customElement, type ColorType } from '@safubit/appkit-ui'
import { AssetUtil, ChainController, type OnRampProvider } from '@safubit/appkit-core'
import styles from './styles.js'
import { ethers } from "ethers";

@customElement('w3m-onsynctelegram-provider-item')
export class W3mOnSyncTelegramProviderItem extends LitElement {
  public static override styles = [styles]

  @property({ type: Boolean }) public disabled = false
  @property() color: ColorType = 'inherit'
  @property() public name?: OnRampProvider['name']
  @property() public label = ''
  @property({ type: Boolean }) public loading = false
  @property() public onClick: (() => void) | null = null
  @state() private otp = ''
  @state() private countdown = ''
  @state() private error = ''
  private countdownInterval: number | null = null
  private remainingSeconds: number = 0

  private async onClickProvider() {
    try {
      this.loading = true;
      this.error = '';
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const message = "TELEGRAM_OTP_SYNC_WITH_WALLET"
      
      const signature = await signer.signMessage(message);
      const payload = {
        hash: signature,
        message: message,
        address: address,
        provider: "safupump"
      }
      const response = await fetch('/api/telegram-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message || 'Unknown error occurred');
      }
      
      this.otp = data.data.otp.toString();
      this.remainingSeconds = data.data.expires_in;
      this.startCountdown();
    } catch(e) {
      console.error('Error Sync Telegram', e);
      this.error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      this.loading = false;
    }
  }

  private startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    const updateCountdown = () => {
      if (this.remainingSeconds <= 0) {
        clearInterval(this.countdownInterval!);
        this.countdown = 'Expired';
        this.otp = '';
      } else {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.countdown = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.remainingSeconds--;
      }

      this.requestUpdate();
    };

    updateCountdown(); // Panggil sekali untuk menghindari penundaan 1 detik pertama
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  public override render() {
    return html`
      <button ?disabled=${this.disabled || this.loading} @click=${this.onClickProvider}>
        <wui-icon name="telegram" class="provider-image"></wui-icon>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">
              ${this.countdown || 'Click to generate OTP'}
              </wui-text>
            </wui-text>
          </wui-flex>
        </wui-flex>
        ${this.loading
          ? html`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`
          : this.otp 
            ? html`<wui-text variant="paragraph-500" color="fg-100">${this.otp}</wui-text>`
            : this.error
              ? html`<wui-text variant="small-500" color="error-100">${this.error}</wui-text>`
              : html``}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-onsynctelegram-provider-item': W3mOnSyncTelegramProviderItem
  }
}