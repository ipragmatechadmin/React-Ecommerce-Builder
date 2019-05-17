import { Container } from 'inversify'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { IAuthorizeService } from 'core/services/authorize'
import { AuthorizeService } from './services/authorize/AuthorizeService'
import { IShippingService } from 'core/services/shippings'
import { ShippingService } from './services/shippings/ShippingService'
import { IProductService } from 'core/services/products'
import { ProductService } from './services/products/ProductService'
import { ICartService } from 'core/services/cart'
import { CartService } from './services/cart/CartService'

/**
 * Register ecommerce client dependecies
 * @param container DI container
 */
export const useEcommercestore = (container: Container) => {
  container.bind<IAuthorizeService>(SocialProviderTypes.AuthorizeService).to(AuthorizeService)
  container.bind<IShippingService>(SocialProviderTypes.ShippingService).to(ShippingService)
  container.bind<IProductService>(SocialProviderTypes.ProductService).to(ProductService)
  container.bind<ICartService>(SocialProviderTypes.CartService).to(CartService)
}
