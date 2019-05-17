// - Import domain
import { Map, fromJS} from 'immutable'

import { IShippingService } from 'src/core/services/shippings'
import { ShippingAddress } from 'core/domain/shippings'
import { ShippingsActionType } from 'constants/shippingsActionType'
import { SocialError } from 'src/core/domain/common'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/ecommerceEngine'
import * as checkoutActions from 'store/actions/checkoutActions'
import * as globalActions from 'store/actions/globalActions'

/**
 * Get service providers
 */
const shippingService: IShippingService = provider.get<IShippingService>(SocialProviderTypes.ShippingService)

/**
 * Get all user shipping rigions from data base
 */
export const dbGetShippingRegions = () => {
  return (dispatch: any, getState: Function) => {
    return shippingService.getShippingRegions().then((result) => {
      let parsedData: Map<string, Map<string, any>> = Map({})
      result.shippingRegions.forEach((shippingRegions) => {
        const shippingRegionsId = Object.keys(shippingRegions)[0]
        const shippingRegionsData = shippingRegions[shippingRegionsId]
        parsedData = parsedData.setIn([shippingRegionsId], fromJS(shippingRegionsData))
      })

      dispatch(addRegions(parsedData))
    })
    .catch((error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
    })
  }
}

export const dbAddShippingAddress = (shippingAddress: ShippingAddress) => {
  return (dispatch: any, getState: Function) => {
    dispatch(globalActions.showTopLoading())
    return shippingService.addShippingAddress(shippingAddress).then((result: ShippingAddress) => {
      dispatch(addShippingAddress(result))
      dispatch(globalActions.hideTopLoading())
    })
  }
}

export const dbAddShippingAddressfromcheckout = (shippingAddress: ShippingAddress) => {
  return (dispatch: any, getState: Function) => {
    dispatch(globalActions.showTopLoading())
    return shippingService.addShippingAddress(shippingAddress).then((result: ShippingAddress) => {
      dispatch(checkoutActions.setActiveStep(1))
      dispatch(addShippingAddress(result))
      dispatch(globalActions.hideTopLoading())
    })
  }
}

export const dbGetShippingAddress = () => {
  return (dispatch: any, getState: Function) => {
    dispatch(globalActions.showTopLoading())
    return shippingService.getShippingAddress().then((result: ShippingAddress) => {
      dispatch(addShippingAddress(result))
      dispatch(globalActions.hideTopLoading())
    })
  }
}

export const dbGetShippingAddressRefresh = () => {
  return (dispatch: any, getState: Function) => {
    return shippingService.getShippingAddress().then((result: ShippingAddress) => {
      dispatch(addShippingAddress(result))
    })
  }
}

/**
 * Get all user shipping rates from data base
 */
export const dbGetShippingRates = (regionId: string) => {
  return (dispatch: any, getState: Function) => {
    return shippingService.getShippingRates(regionId).then((result) => {
      let parsedData: Map<string, Map<string, any>> = Map({})
      result.shippingRates.forEach((shippingRates) => {
        const shippingId = Object.keys(shippingRates)[0]
        const shippingRatesData = shippingRates[shippingId]
        parsedData = parsedData.setIn([shippingId], fromJS(shippingRatesData))
      })

      dispatch(addRates(parsedData))
    })
    .catch((error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
    })
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add a list of rigions
 */
export const addRegions = (shippingRegions: Map<string, Map<string, any>>) => {
  return {
    type: ShippingsActionType.ADD_LIST_SHIPPING_RIGIONS,
    payload: {shippingRegions}
  }
}

/**
 * Add a Shipping Address
 */
export const addShippingAddress = (shippingAddress: ShippingAddress) => {
  return {
    type: ShippingsActionType.ADD_SHIPPING_ADDRESS,
    payload: { shippingAddress }
  }
}

/**
 * Add a list of shipping Rates
 */
export const addRates = (shippingRates: Map<string, Map<string, any>>) => {
  return {
    type: ShippingsActionType.ADD_LIST_SHIPPING_RATES,
    payload: {shippingRates}
  }
}
