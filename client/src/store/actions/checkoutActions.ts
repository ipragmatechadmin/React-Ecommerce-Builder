// - Import action types
import { CheckoutActionType } from 'constants/checkoutActionType'

  /* _____________ CRUD State _____________ */

  /**
   * Add a list of rigions
   */
  export const setActiveStep = (step: number) => {
    console.log('checkout comes in checkout action')
    return {
      type: CheckoutActionType.ACTIVE_STEP,
      payload: {step}
    }
  }
