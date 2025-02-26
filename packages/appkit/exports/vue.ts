import { AppKit } from '../src/client.js'
import type { AppKitOptions } from '../src/utils/TypesUtil.js'
import { getAppKit } from '../src/library/vue/index.js'
import { CoreHelperUtil } from '@safubit/appkit-core'
import { PACKAGE_VERSION } from './constants.js'

// -- Views ------------------------------------------------------------
export * from '@safubit/appkit-scaffold-ui'

// -- Hooks ------------------------------------------------------------
export * from '../src/library/vue/index.js'

// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js'
export type * from '@safubit/appkit-core'
export type { CaipNetwork, CaipAddress, CaipNetworkId } from '@safubit/appkit-common'
export { CoreHelperUtil, AccountController } from '@safubit/appkit-core'

let modal: AppKit | undefined = undefined

type CreateAppKit = Omit<AppKitOptions, 'sdkType' | 'sdkVersion'>

export function createAppKit(options: CreateAppKit) {
  if (!modal) {
    modal = new AppKit({
      ...options,
      sdkVersion: CoreHelperUtil.generateSdkVersion(options.adapters ?? [], 'html', PACKAGE_VERSION)
    })
    getAppKit(modal)
  }

  return modal
}

export { AppKit }
export type { AppKitOptions }

// -- Hooks ------------------------------------------------------------
export * from '../src/library/vue/index.js'
