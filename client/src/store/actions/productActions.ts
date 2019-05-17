// - Import domain
import { Map, fromJS } from 'immutable'
import { IProductService } from 'src/core/services/products'
import { Product } from 'src/core/domain/products'
import { ProductActionType } from 'constants/productActionType'
import { SocialError } from 'src/core/domain/common'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/ecommerceEngine'
import * as globalActions from 'store/actions/globalActions'

/**
 * Get service providers
 */
const productService: IProductService = provider.get<IProductService>(SocialProviderTypes.ProductService)

/**
 * Get all user products from data base
 */
export const dbGetProducts = (page: number = 0, limit: number = 10) => {
  return (dispatch: any, getState: Function) => {
    const lastPageRequest = 10
    if (lastPageRequest !== page) {
      return productService.getProducts(page, limit).then((result) => {
        if (!result.products || !(result.products.length > 0)) {
          return dispatch(notMoreDataStream())
        }

        let parsedData: Map<string, Map<string, any>> = Map({})
        result.products.forEach((product) => {
          const productId = Object.keys(product)[0]
          const productData = product[productId]
          parsedData = parsedData.setIn([productId], fromJS(productData))
        })
        dispatch(productsPageCount(result.pageCount))
        dispatch(addProducts(parsedData))
      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showMessage(error.message))
        })

    }
  }
}

/**
 * Get all user products by search text from data base
 */
export const dbGetProductsBySearchText = (page: number = 0, limit: number = 10, searchText: string) => {
  return (dispatch: any, getState: Function) => {
    const lastPageRequest = 10
    if (lastPageRequest !== page) {
      return productService.getProductsBySearchText(page, limit, searchText).then((result) => {
        if (!result.products || !(result.products.length > 0)) {
          return dispatch(notMoreDataStream())
        }

        let parsedData: Map<string, Map<string, any>> = Map({})
        result.products.forEach((product) => {
          const productId = Object.keys(product)[0]
          const productData = product[productId]
          parsedData = parsedData.setIn([productId], fromJS(productData))
        })
        dispatch(productsPageCount(result.pageCount))
        dispatch(addProductsBySearchText(parsedData))
      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showMessage(error.message))
        })

    }
  }
}

/**
 * Get all user products by category from data base
 */
export const dbGetProductsByCategory = (page: number = 0, limit: number = 10, category: string) => {
  return (dispatch: any, getState: Function) => {
    const lastPageRequest = 10
    if (lastPageRequest !== page) {
      return productService.getProductsByCategory(page, limit, category).then((result) => {
        if (!result.products || !(result.products.length > 0)) {
          return dispatch(notMoreDataStream())
        }

        let parsedData: Map<string, Map<string, any>> = Map({})
        result.products.forEach((product) => {
          const productId = Object.keys(product)[0]
          const productData = product[productId]
          parsedData = parsedData.setIn([productId], fromJS(productData))
        })
        dispatch(productsPageCount(result.pageCount))
        dispatch(addProductsByCategory(parsedData))
      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showMessage(error.message))
        })

    }
  }
}

/**
 * Get all user products by category from data base
 */
export const dbGetProductsAttributes = (productId: string) => {
  return (dispatch: any, getState: Function) => {
      return productService.getProductAttributes(productId).then((result) => {
        if (!result.products || !(result.products.length > 0)) {
          return dispatch(notMoreDataStream())
        }

        let parsedData: Map<string, Map<string, any>> = Map({})
        result.products.forEach((product) => {
          const productId = Object.keys(product)[0]
          const productData = product[productId]
          parsedData = parsedData.setIn([productId], fromJS(productData))
        })

        dispatch(addProductsAttributes(parsedData))
      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showMessage(error.message))
        })
  }
}

/**
 * Get all product details
 */
export const dbGetProductById = ( productId: string ) => {
  return (dispatch: any, getState: Function) => {

      return productService.getProductById(productId).then((product: Product) => {
        console.log('product detail in the product action --- ' + product )
        dispatch(addProduct(product))
      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showMessage(error.message))
        })
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add a normal product
 */
export const addProduct = (product: Product) => {
  console.log('product detail in the addProduct in product action --- ' + product )
  return {
    type: ProductActionType.ADD_PRODUCT_DETAIL,
    payload: { product }
  }
}

/**
 * Update a product
 */
export const updateProduct = (product: Map<string, any>) => {
  return {
    type: ProductActionType.UPDATE_PRODUCT,
    payload: { product }
  }
}

/**
 * Update the comments of product
 */
export const updateProductComments = (comments: Map<string, any>) => {
  return {
    type: ProductActionType.UPDATE_PRODUCT,
    payload: comments
  }
}

/**
 * Update the votes of product
 */
export const updateProductVotes = (votes: Map<string, any>) => {
  return {
    type: ProductActionType.UPDATE_PRODUCT,
    payload: votes
  }
}

/**
 * Delete a product
 */
export const deleteProduct = (uid: string, id: string) => {
  return {
    type: ProductActionType.DELETE_PRODUCT,
    payload: { uid, id }
  }
}

/**
 *  Products Page Count
 */
export const productsPageCount = (productsPageCount: number) => {
  return {
    type: ProductActionType.PRODUCTS_PAGE_COUNT,
    payload: { productsPageCount }
  }
}

/**
 * Add a list of product
 */
export const addProducts = (userProducts: Map<string, Map<string, any>>) => {
  return {
    type: ProductActionType.ADD_LIST_PRODUCT,
    payload: { userProducts }
  }
}

/**
 * Add a list of product by Search text
 */
export const addProductsBySearchText = (userProductsBySearchText: Map<string, Map<string, any>>) => {
  return {
    type: ProductActionType.ADD_LIST_PRODUCT_SEARCH_TEXT,
    payload: { userProductsBySearchText }
  }
}

/**
 * Add a list of product by Category
 */
export const addProductsByCategory = (userProductsByCategory: Map<string, Map<string, any>>) => {
  return {
    type: ProductActionType.ADD_LIST_PRODUCT_CATEGORY,
    payload: { userProductsByCategory }
  }
}

/**
 * Add a list of product Attributes
 */
export const addProductsAttributes = (userProductsAttributes: Map<string, Map<string, any>>) => {
  return {
    type: ProductActionType.ADD_LIST_PRODUCT_ATTRIBUTES,
    payload: { userProductsAttributes }
  }
}

/**
 * Clea all data in product store
 */
export const clearAllData = () => {
  return {
    type: ProductActionType.CLEAR_ALL_DATA_PRODUCT
  }
}

/**
 * Clea search list in product store
 */
export const dbClearAllSearchList = () => {
  return {
    type: ProductActionType.CLEAR_SEARCH_DATA_PRODUCT
  }
}

/**
 * Clea category list in product store
 */
export const dbClearAllCategoryProductList = () => {
  return {
    type: ProductActionType.CLEAR_CATEGORY_DATA_PRODUCT
  }
}

/**
 * Add a product with image
 */
export const addImageProduct = (uid: string, product: any) => {
  return {
    type: ProductActionType.ADD_IMAGE_PRODUCT,
    payload: { uid, product }
  }

}

/**
 * Set stream has more data to show
 */
export const hasMoreDataStream = () => {
  return {
    type: ProductActionType.HAS_MORE_DATA_STREAM
  }

}

/**
 * Set stream has not data any more to show
 */
export const notMoreDataStream = () => {
  return {
    type: ProductActionType.NOT_MORE_DATA_STREAM
  }

}

/**
 * Set last page request of stream
 */
export const requestPageStream = (page: number) => {
  return {
    type: ProductActionType.REQUEST_PAGE_STREAM,
    payload: { page }
  }

}

/**
 * Set last product identification of stream
 */
export const lastProductStream = (lastProductId: string) => {
  return {
    type: ProductActionType.LAST_PRODUCT_STREAM,
    payload: { lastProductId }
  }

}

/**
 * Set profile products has more data to show
 */
export const hasMoreDataProfile = () => {
  return {
    type: ProductActionType.HAS_MORE_DATA_PROFILE
  }

}

/**
 * Set profile products has not data any more to show
 */
export const notMoreDataProfile = (userId: string) => {
  return {
    type: ProductActionType.NOT_MORE_DATA_PROFILE,
    payload: { userId }
  }

}

/**
 * Set last page request of profile products
 */
export const requestPageProfile = (userId: string, page: number) => {
  return {
    type: ProductActionType.REQUEST_PAGE_PROFILE,
    payload: { userId, page }
  }

}

/**
 * Set last product identification of profile products
 */
export const lastProductProfile = (userId: string, lastProductId: string) => {
  return {
    type: ProductActionType.LAST_PRODUCT_PROFILE,
    payload: { userId, lastProductId }
  }

}
