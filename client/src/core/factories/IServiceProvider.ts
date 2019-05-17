import {
  IAuthorizeService,
  IProductService,
  IShippingService
} from 'core/services'

export interface IServiceProvider {

   /**
    * Create authorize service
    *
    * @memberof IServiceProvider
    */
  createAuthorizeService: () => IAuthorizeService

  /**
   * Create instant for Product Service
   *
   * @memberof ServiceProvide
   */
  createProductService: () => IProductService

  /**
   * Create instant for Shipping Service
   *
   * @memberof ServiceProvide
   */
  createShippingService: () => IShippingService

}
