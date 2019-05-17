import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const uniqid = require('uniqid')

import { addToCartActions, authorizeActions } from '../../../store/actions'

describe('async addToCartActions actions', () => {
  let store
  let cartId = uniqid()
  const attributes = JSON.stringify({
    productColor: 'blue',
    productSize: 'L',
    productThumbnail: 'thumbnail'
  })
  let cartData =
    {
      productId: 1,
      attributes: attributes,
      quantity: 1,
      buyNow: 1
    }

  beforeEach(() => {
    store = mockStore({})
  })
  afterEach(() => {
    // clear all HTTP mocks after each test
    nock.cleanAll()
  })

  it('Creates addToCart on the server', () => {

    // Simulate a successful response
    nock('http://localhost:3000')
      .defaultReplyHeaders(
        { 'access-control-allow-origin': '*' },
        { 'Access-Control-Allow-Credentials': true },
        { 'Content-Type': 'application/json' }
      )
      .post(
        '/api/store/cart', JSON.stringify(cartData)
      ) // Route to catch and mock
      .reply(200, cartData) // Mock reponse code and data
    // Dispatch action to fetch to-dos
    return store
      .dispatch(
          addToCartActions.dbAddProductToCart(cartId, cartData)
      )
      .then(() => {
        // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

})
