// - Import react components
import { Map } from 'immutable'

import { CheckoutActionType } from 'constants/checkoutActionType'

import { CheckoutState } from './CheckoutState'
import { ICheckoutAction } from './ICheckoutAction'

/**
 * shipping reducer
 * @param {object} state
 * @param {object} action
 */
export let checkoutReducer = (state = Map(new CheckoutState()), action: ICheckoutAction) => {
  const { payload } = action
  switch (action.type) {
    case CheckoutActionType.CLEAR_ALL_DATA_CHECKOUT:
      return Map(new CheckoutState())
    case CheckoutActionType.ACTIVE_STEP:
      return state
        .setIn(['activeState'], payload.step)
    default:
      return state

  }
}
