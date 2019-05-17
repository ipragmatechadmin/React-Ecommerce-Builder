import { ShippingRegion } from 'src/core/domain/shippings'
import { Map, fromJS, List } from 'immutable'

/**
 * shipping state
 *
 * @export
 * @class shippingState
 */
export class ShippingsState {
  [key: string]: any
    /**
     * The list of user shippings
     *
     * @type {*}
     * @memberof shippingState
     */
  shippingRegions = Map({})

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
