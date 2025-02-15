import { customElement } from '@safubit/appkit-ui'
import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js'
import type { OnOtpSubmitFn, OnOtpResendFn } from '../../utils/w3m-email-otp-widget/index.js'
import {
  EventsController,
  ConnectionController,
  ModalController,
  RouterController,
  AccountController,
  ChainController,
  OptionsController
} from '@safubit/appkit-core'
import { state } from 'lit/decorators.js'

@customElement('w3m-email-verify-otp-view')
export class W3mEmailVerifyOtpView extends W3mEmailOtpWidget {
  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State ------------------------------------------- //
  @state() private smartAccountDeployed = AccountController.state.smartAccountDeployed

  public constructor() {
    super()

    this.unsubscribe.push(
      AccountController.subscribeKey('smartAccountDeployed', val => {
        this.smartAccountDeployed = val
      })
    )
  }

  // --  Private ------------------------------------------ //
  override onOtpSubmit: OnOtpSubmitFn = async otp => {
    try {
      if (this.authConnector) {
        const smartAccountEnabled = ChainController.checkIfSmartAccountEnabled()
        await this.authConnector.provider.connectOtp({ otp })
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' })

        if (ChainController.state.activeChain) {
          await ConnectionController.connectExternal(
            this.authConnector,
            ChainController.state.activeChain
          )
        } else {
          throw new Error('Active chain is not set on ChainControll')
        }

        EventsController.sendEvent({
          type: 'track',
          event: 'CONNECT_SUCCESS',
          properties: { method: 'email', name: this.authConnector.name || 'Unknown' }
        })
        if (AccountController.state.allAccounts.length > 1) {
          RouterController.push('SelectAddresses')
        } else if (smartAccountEnabled && !this.smartAccountDeployed) {
          RouterController.push('UpgradeToSmartAccount')
        } else if (!OptionsController.state.isSiweEnabled) {
          ModalController.close()
        }
      }
    } catch (error) {
      EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_FAIL' })
      throw error
    }
  }

  override onOtpResend: OnOtpResendFn = async email => {
    if (this.authConnector) {
      await this.authConnector.provider.connectEmail({ email })
      EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' })
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-email-verify-otp-view': W3mEmailVerifyOtpView
  }
}
