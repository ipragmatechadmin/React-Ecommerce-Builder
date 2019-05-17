import config from 'src/config'

 // Base URL of the server
const apiBaseURL = config.ecommerce.baseURL

// Post Login
const getLoginURL = apiBaseURL + 'login'

// Post Signup
const getSignupURL = apiBaseURL + 'signup'

// Logout
const getLogoutURL = apiBaseURL + 'signout'

// Get User Info
const getUserInfoURL = apiBaseURL + 'getUserInfo'

// Shipping
const getShippingRegionsURL = apiBaseURL + 'shipping/findShippingRegion'

// Shipping
const getShippingRatesURL = apiBaseURL + 'shipping/findShippingRates/'

// Get Product Detail
const getProductDetailURL = apiBaseURL + 'product/'

// Get Product Detail
const getProductAttributesURL = apiBaseURL + 'product/getAttributes/'

// Get Products
const getProductsURL = apiBaseURL + 'product'

// Get Products by Search Text
const getProductsSearchTextURL = apiBaseURL + 'product/findBySearchText'

// Get Products by Category Id
const getProductsCategoryURL = apiBaseURL + 'product/findByCategory'

// Add Shipping Address
const addShippingURL = apiBaseURL + 'shipping'

// Add Cart item
const addCartItemURL = apiBaseURL + 'store/cart'

// Add Cart item
const addOrderURL = apiBaseURL + 'store/order'

export {
  getLoginURL,
  getSignupURL,
  getLogoutURL,
  getUserInfoURL,
  getShippingRegionsURL,
  getShippingRatesURL,
  getProductDetailURL,
  getProductAttributesURL,
  getProductsURL,
  getProductsSearchTextURL,
  getProductsCategoryURL,
  addShippingURL,
  addCartItemURL,
  addOrderURL
}
