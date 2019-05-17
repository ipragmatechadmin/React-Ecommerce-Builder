import { User } from 'core/domain/users'
import { Product } from 'core/domain/products'

/**
 * Product service interface
 *
 * @export
 * @interface IProductService
 */
export interface IProductService {
  getProducts: (page: number, limit: number)
  => Promise<{products: {[productId: string]: Product }[], itemCount: number, pageCount: number}>

  getProductsBySearchText: (page: number, limit: number, searchText: string)
  => Promise<{products: {[productId: string]: Product }[], itemCount: number, pageCount: number}>

  getProductsByCategory: (page: number, limit: number, category: string)
  => Promise<{products: {[productId: string]: Product }[], itemCount: number, pageCount: number}>

  getProductById: (productId: string) => Promise<Product>

  getProductAttributes: (productId: string)
  => Promise<{products: {[attributeValueId: string]: Product }[], itemCount: number, pageCount: number}>
}
