import { AddToCartActionType } from 'constants/addToCartActionType'

/**
 * Product action interface
 *
 * @export
 * @interface IProductAction
 */
export interface IAddToCartAction {
  payload: any,
  type: AddToCartActionType

}
