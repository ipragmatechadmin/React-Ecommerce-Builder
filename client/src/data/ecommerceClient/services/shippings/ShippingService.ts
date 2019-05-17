// - Import react components
import { injectable } from 'inversify'
import axios from 'axios'

import { IShippingService } from 'core/services/shippings'
import {
  ShippingAddress,
  ShippingRates,
  ShippingRegion
} from 'core/domain/shippings'
import { SocialError } from 'core/domain/common'
import { getShippingRegionsURL,addShippingURL,getShippingRatesURL } from 'data/ecommerceClient'

/**
 * Firbase shippingRegion service
 *
 * @export
 * @class ShippingService
 * @implements {IShippingService}
 */
@injectable()
export class ShippingService implements IShippingService {
  /**
   * Get the shippingRegions
   */
  public getShippingRegions: ()
    => Promise<{ shippingRegions: { [shippingRegionId: string]: ShippingRegion }[] }> = () => {
      return new Promise<{ shippingRegions: { [shippingRegionId: string]: ShippingRegion }[]}>((resolve, reject) => {
        let parsedData: { [shippingRegionId: string]: ShippingRegion }[] = []
        let data = {}
        axios.get(getShippingRegionsURL, {data, headers: {accept: 'application/json'},  withCredentials: true})
  			  .then(shippingRegions => {
              shippingRegions.data.shippingRegions.forEach((shippingRegionResult: any) => {
              const shippingRegion = shippingRegionResult as ShippingRegion
              parsedData = [
                ...parsedData,
                {
                  [shippingRegionResult.shippingRegionId]: {
                    shippingRegionId: shippingRegionResult.shippingRegionId,
                    ...shippingRegion
                  }
                }

              ]
            })
            resolve({ shippingRegions: parsedData })
  			  })
  			  .catch(error => {
            reject(new SocialError(error.code, error.message))
  			  })
    })
  }

  /**
   * Add Shipping Address
   */
  public addShippingAddress = (shippingAddress: ShippingAddress) => {
    return new Promise<ShippingAddress>((resolve, reject) => {
      const data = {customerId: shippingAddress.customerId, address1: shippingAddress.address as string,address2: shippingAddress.address as string, city: shippingAddress.city as string, region: shippingAddress.regionValue, postalCode: shippingAddress.postalCode as string, country: 'Great Britain', shippingRegionId: shippingAddress.region, shippingType: shippingAddress.shippingType, shippingCost: shippingAddress.shippingCost, shippingId: shippingAddress.shippingId}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.post(addShippingURL, data, config)
      .then((result) => {
        // added the shipping address
         resolve(result.data)

      }).catch(error => {
        reject(new SocialError(error.code, error.message))
      })

    })
  }

  /**
   * Get Shipping Address
   */
  public getShippingAddress = () => {
    return new Promise<ShippingAddress>((resolve, reject) => {
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.get(addShippingURL, config)
      .then((result) => {
         resolve(Object.values(result.data)[0])
      }).catch(error => {
        reject()
      })

    })
  }

  /**
   * Get the shippingRates by region id
   */
  public getShippingRates: (regionId: string)
    => Promise<{ shippingRates: { [shippingId: string]: ShippingRates }[] }> = (regionId) => {
      return new Promise<{ shippingRates: { [shippingId: string]: ShippingRates }[]}>((resolve, reject) => {
        let parsedData: { [shippingId: string]: ShippingRates }[] = []
        let data = {}
        axios.get(getShippingRatesURL + regionId, {data, headers: {accept: 'application/json'},  withCredentials: true})
  			  .then(shippingRates => {
              shippingRates.data.forEach((shippingRatesResult: any) => {
              const shippingRates = shippingRatesResult as ShippingRates
              parsedData = [
                ...parsedData,
                {
                  [shippingRatesResult.shippingId]: {
                    shippingId: shippingRatesResult.shippingId,
                    ...shippingRates
                  }
                }

              ]
            })
            resolve({ shippingRates: parsedData })
  			  })
  			  .catch(error => {
            reject(new SocialError(error.code, error.message))
  			  })
    })
  }
}
