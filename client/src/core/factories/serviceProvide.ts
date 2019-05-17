//#region Interfaces

import { IServiceProvider } from 'core/factories'
import { injectable } from 'inversify'
import {
  IAuthorizeService,
  IProductService,
  IShippingService
} from 'core/services'

//#endregion

//#region Service implemented classes

// - Ecommerce services
import {
  AuthorizeService,
  ProductService,
  ShippingService
} from 'data/ecommerceClient/services'

//#endregion
@injectable()
export class ServiceProvide implements IServiceProvider {

  /**
   * Create instant for Authorize Service
   *
   * @memberof ServiceProvide
   */
  createAuthorizeService: () => IAuthorizeService = () => {
    return new AuthorizeService()
  }

  /**
   * Create instant for Product Service
   *
   * @memberof ServiceProvide
   */
  createProductService: () => IProductService = () => {
    return new ProductService()
  }

  /**
   * Create instant for Shipping Service
   *
   * @memberof ServiceProvide
   */
  createShippingService: () => IShippingService = () => {
    return new ShippingService()
  }

}
