// - Import react components
import { injectable } from 'inversify'
import axios from 'axios'

import { IProductService } from 'core/services/products'
import { Product } from 'core/domain/products'
import { SocialError } from 'core/domain/common'
import { getProductsURL, getProductsSearchTextURL, getProductsCategoryURL , getProductDetailURL, getProductAttributesURL } from 'data/ecommerceClient'

/**
 * Firbase product service
 *
 * @export
 * @class ProductService
 * @implements {IProductService}
 */
@injectable()
export class ProductService implements IProductService {

  /**
   * Get the products
   */
  public getProducts: (page: number, limit: number)
    => Promise<{ products: { [productId: string]: Product }[], itemCount: number, pageCount: number }> = (page = 0, limit = 10) => {
      return new Promise<{ products: { [productId: string]: Product }[], itemCount: number, pageCount: number }>((resolve, reject) => {
        let parsedData: { [productId: string]: Product }[] = []
        let data = {}
        axios.get(getProductsURL, { params: {
          page: page,
          limlt: limit
        }, headers: { accept: 'application/json' }})
            .then(products => {
              products.data.products.forEach((productResult: any) => {
                const product = productResult as Product
                parsedData = [
                  ...parsedData,
                  {
                    [productResult.productId]: {
                      productId: productResult.productId,
                      ...product
                    }
                  }

                ]
              })
              resolve({ products: parsedData, itemCount: products.data.itemCount,  pageCount: products.data.pageCount})
            })
            .catch(error => {
                reject(new SocialError(error.code, error.message))
            })
         })
  }

  /**
   * Get the products by search
   */
  public getProductsBySearchText: (page: number, limit: number, searchText: string)
    => Promise<{ products: { [productId: string]: Product }[], itemCount: number, pageCount: number }> = (page = 0, limit = 10, searchText) => {
      return new Promise<{ products: { [productId: string]: Product }[], itemCount: number, pageCount: number }>((resolve, reject) => {
        let parsedData: { [productId: string]: Product }[] = []
        let data = {}
        axios.get(getProductsSearchTextURL, { params: {
          searchText: searchText,
          page: page,
          limlt: limit
        }, headers: { accept: 'application/json' }})
            .then(products => {
              products.data.products.forEach((productResult: any) => {
                const product = productResult as Product
                parsedData = [
                  ...parsedData,
                  {
                    [productResult.productId]: {
                      productId: productResult.productId,
                      ...product
                    }
                  }

                ]
              })
              resolve({ products: parsedData, itemCount: products.data.itemCount,  pageCount: products.data.pageCount})
            })
            .catch(error => {
                reject(new SocialError(error.code, error.message))
            })
         })
  }

  /**
   * Get the products by category
   */
  public getProductsByCategory: (page: number, limit: number, category: string)
    => Promise<{ products: { [productId: string]: Product }[], itemCount: number, pageCount: number }> = (page = 0, limit = 10, category) => {
      return new Promise<{ products: { [productId: string]: Product }[], itemCount: number, pageCount: number }>((resolve, reject) => {
        let parsedData: { [productId: string]: Product }[] = []
        let data = {}
        axios.get(getProductsCategoryURL, { params: {
          category: category,
          page: page,
          limlt: limit
        }, headers: { accept: 'application/json' }})
            .then(products => {
              products.data.products.forEach((productResult: any) => {
                const product = productResult as Product
                parsedData = [
                  ...parsedData,
                  {
                    [productResult.productId]: {
                      productId: productResult.productId,
                      ...product
                    }
                  }

                ]
              })
              resolve({ products: parsedData, itemCount: products.data.itemCount,  pageCount: products.data.pageCount})
            })
            .catch(error => {
                reject(new SocialError(error.code, error.message))
            })
         })
  }

  /**
   * Get product by the product identifier
   */
    public getProductById: (productId: string)
      => Promise<Product> = (productId) => {
        return new Promise<Product>((resolve, reject) => {
          let data = {}
          axios.get(getProductDetailURL + productId, { data, headers: { accept: 'application/json' }})
          .then(product => {
           resolve(product.data)
          })

          .catch(error => {
              reject(new SocialError(error.code, error.message))
          })
        })

    }

  /**
   * Get the product attributes
   */
  public getProductAttributes: (productId: string)
  => Promise<{ products: { [attributeValueId: string]: Product }[], itemCount: number, pageCount: number }> = (productId) => {
    return new Promise<{ products: { [attributeValueId: string]: Product }[], itemCount: number, pageCount: number }>((resolve, reject) => {
      let parsedData: { [attributeValueId: string]: Product }[] = []
      let data = {}
      axios.get(getProductAttributesURL + productId, { data, headers: { accept: 'application/json' }})
          .then(products => {
            products.data.forEach((productResult: any) => {
              const product = productResult as Product
              parsedData = [
                ...parsedData,
                {
                  [productResult.attributeValueId]: {
                    productId: productResult.attributeValueId,
                    ...product
                  }
                }

              ]
            })
            resolve({ products: parsedData, itemCount: products.data.itemCount,  pageCount: products.data.pageCount})
          })
          .catch(error => {
              reject(new SocialError(error.code, error.message))
          })
       })
}
}
