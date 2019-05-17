import { Product } from 'src/core/domain/products'
import { Map, fromJS, List } from 'immutable'

/**
 * Product state
 *
 * @export
 * @class ProductState
 */
export class ProductState {
  [key: string]: any
    /**
     * The list of user products
     *
     * @type {*}
     * @memberof ProductState
     */
  userProducts = Map({})

    /**
     * If user products are loaded {true} or not {false}
     *
     * @type {Boolean}
     * @memberof ProductState
     */
  loaded: Boolean = false

  /**
   * Stream data storage
   */
  stream?: Map<string,any> =
  Map({hasMoreData: true, lastPageRequest: -1, lastProductId: ''})

  /**
   * Profile products data storage
   */
  profile?: Map<string, any> =
  Map({})
}
