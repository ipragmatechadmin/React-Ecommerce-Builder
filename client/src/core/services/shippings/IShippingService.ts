import { ShippingRegion } from 'core/domain/shippings'
import { ShippingAddress } from 'core/domain/shippings'
import { ShippingRates } from 'core/domain/shippings'

/**
 * Product service interface
 *
 * @export
 * @interface IShippingService
 */
export interface IShippingService {
  getShippingRegions: ()
  => Promise<{shippingRegions: {[shippingRegionId: string]: ShippingRegion }[]}>

  /**
   * @returns {Promise<ShippingAddress>}
   */
addShippingAddress: (shippingAddress: ShippingAddress) => Promise<ShippingAddress>

getShippingAddress: () => Promise<ShippingAddress>

getShippingRates: (regionId: string)
=> Promise<{shippingRates: {[shippingId: string]: ShippingRates }[]}>
}
