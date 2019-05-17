// - Import react components
import { Map } from 'immutable'

import { ProductActionType } from 'constants/productActionType'

import { IProductAction } from './IProductAction'
import { ProductState } from './ProductState'

const updateProduct = (state: any, payload: any) => {
  const product: Map<string, any> = payload.product
  const updateProductOwnerId = product.get('ownerUserId')
  const updateProductId = product.get('id')
  return state.setIn(
    ['userProducts', updateProductOwnerId, updateProductId],
    Map(product)
  )
}

const updateProductComments = (state: any, payload: any) => {
  const product: Map<string, any> = payload.product
  const updateProductOwnerId = product.get('ownerUserId')
  const updateProductId = product.get('id')
  return state.setIn(
    ['userProducts', updateProductOwnerId, updateProductId, 'comments'],
    product.get('comments')
  )
}

const updateProductVotes = (state: any, payload: any) => {
  const product: Map<string, any> = payload.product
  const updateProductOwnerId = product.get('ownerUserId')
  const updateProductId = product.get('id')
  return state.setIn(
    ['userProducts', updateProductOwnerId, updateProductId, 'votes'],
    product.get('votes')
  )
}

/**
 * Product reducer
 * @param {object} state
 * @param {object} action
 */
export let productReducer = (
  state = Map(new ProductState()),
  action: IProductAction
) => {
  const { payload } = action
  switch (action.type) {
    case ProductActionType.CLEAR_ALL_DATA_PRODUCT:
      return Map(new ProductState())

    case ProductActionType.ADD_IMAGE_PRODUCT:
      return state.setIn(
        ['userProducts', payload.uid, payload.product.id],
        Map(payload.product)
      )

    case ProductActionType.ADD_PRODUCT_DETAIL:
      return state.setIn(['product'], payload.product )

    case ProductActionType.UPDATE_PRODUCT:
      return updateProduct(state, payload)
    case ProductActionType.UPDATE_PRODUCT_COMMENTS:
      return updateProductComments(state, payload)
    case ProductActionType.UPDATE_PRODUCT_VOTES:
      return updateProductVotes(state, payload)

    case ProductActionType.DELETE_PRODUCT:
      return state.deleteIn(['userProducts', payload.uid, payload.id])

    case ProductActionType.ADD_LIST_PRODUCT:
      return state
        .setIn(['userProducts'], payload.userProducts)
        .set('loaded', true)

    case ProductActionType.ADD_LIST_PRODUCT_SEARCH_TEXT:
      return state
        .setIn(
          ['userProductsBySearchText'],
          payload.userProductsBySearchText
        )
        .set('loaded', true)

        case ProductActionType.ADD_LIST_PRODUCT_ATTRIBUTES:
      return state
        .setIn(
          ['userProductsAttributes'],
          payload.userProductsAttributes
        )

    case ProductActionType.ADD_LIST_PRODUCT_CATEGORY:
      return state
        .setIn(['userProductsByCategory'], payload.userProductsByCategory)
        .set('loaded', true)

    case ProductActionType.PRODUCTS_PAGE_COUNT:
      return state.setIn(['productsPageCount'], payload.productsPageCount)

    case ProductActionType.HAS_MORE_DATA_STREAM:
      return state.setIn(['stream', 'hasMoreData'], true)

    case ProductActionType.NOT_MORE_DATA_STREAM:
      return state.setIn(['stream', 'hasMoreData'], false)

    case ProductActionType.REQUEST_PAGE_STREAM:
      return state.setIn(['stream', 'lastPageRequest'], payload.page)

    case ProductActionType.LAST_PRODUCT_STREAM:
      return state.setIn(['stream', 'lastProductId'], payload.lastProductId)

    case ProductActionType.HAS_MORE_DATA_PROFILE:
      return state.setIn(['profile', 'hasMoreData'], true)

    case ProductActionType.NOT_MORE_DATA_PROFILE:
      return state.setIn(['profile', payload.userId, 'hasMoreData'], false)

    case ProductActionType.REQUEST_PAGE_PROFILE:
      return state.setIn(
        ['profile', payload.userId, 'lastPageRequest'],
        payload.page
      )

    case ProductActionType.LAST_PRODUCT_PROFILE:
      return state.setIn(
        ['profile', payload.userId, 'lastProductId'],
        payload.lastProductId
      )

      case ProductActionType.CLEAR_SEARCH_DATA_PRODUCT:
      return state.deleteAll(['userProductsBySearchText'])

      case ProductActionType.CLEAR_CATEGORY_DATA_PRODUCT:
      return state.deleteAll(['userProductsByCategory'])

    default:
      return state
  }
}
