import { ProductActionType } from 'constants/productActionType'

/**
 * Product action interface
 *
 * @export
 * @interface IProductAction
 */
export interface IProductAction {
  payload: any,
  type: ProductActionType

}
