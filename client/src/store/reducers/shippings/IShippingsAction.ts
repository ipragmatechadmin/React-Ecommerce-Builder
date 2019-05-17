import { ShippingsActionType } from 'constants/shippingsActionType'

/**
 * Product action interface
 *
 * @export
 * @interface IProductAction
 */
export interface IShippingsAction {
  payload: any,
  type: ShippingsActionType

}
