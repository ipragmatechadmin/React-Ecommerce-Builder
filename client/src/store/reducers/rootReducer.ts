import { localeReducer as locale } from 'react-localize-redux'
import {
  combineReducers
} from 'redux-immutable'

// - Import reducers
import { authorizeReducer } from './authorize'
import { globalReducer } from './global'
import { imageGalleryReducer } from './imageGallery'
import { userReducer } from './users'
import { serverReducer } from './server'
import { productReducer } from './products'
import { shippingsReducer } from './shippings'
import { checkoutReducer } from './checkout'
import { addToCartReducer } from './addToCart'
import { connectRouter } from 'connected-react-router/immutable'

// - Reducers
export const rootReducer = (history: any) => combineReducers({
    locale,
    imageGallery: imageGalleryReducer,
    server: serverReducer,
    authorize: authorizeReducer,
    router: connectRouter(history),
    user: userReducer,
    products: productReducer,
    shippings: shippingsReducer,
    checkout: checkoutReducer,
    addToCart: addToCartReducer,
    global: globalReducer
  } as any)
