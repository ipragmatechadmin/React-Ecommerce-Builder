import { CheckoutActionType } from 'constants/checkoutActionType'

/**
 * Product action interface
 *
 * @export
 * @interface IProductAction
 */
export interface ICheckoutAction {
  payload: any,
  type: CheckoutActionType

}
