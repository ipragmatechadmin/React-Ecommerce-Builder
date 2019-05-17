import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import { authorizeActions } from '../../../store/actions'

describe('async actions', () => {
  let store
  let userData = [
    {
      customeId: 1,
      name: 'Kapil Jain',
      email: 'kapil.jain@ipragmatech.com'
    }
  ]
  beforeEach(() => {
    store = mockStore({})
  })
  afterEach(() => {
    // clear all HTTP mocks after each test
    nock.cleanAll()
  })

  it('Creates LOGIN when login has been done', () => {
    // Simulate a successful response
    nock('http://localhost:3000')
      .defaultReplyHeaders(
        { 'access-control-allow-origin': '*' },
        { 'Access-Control-Allow-Credentials': true },
        { 'Content-Type': 'application/json' }
      )
      .post(
        '/api/login',
        JSON.stringify({
          email: 'kapil.jain40@ipragmatech.com',
          password: '123456'
        })
      ) // Route to catch and mock
      .reply(200, userData) // Mock reponse code and data

    // Dispatch action to fetch to-dos
    return store
      .dispatch(
        authorizeActions.dbLogin('kapil.jain40@ipragmatech.com', '123456')
      )
      .then(() => {
        // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('Creates LOGIN when login with wrong Credentials', () => {
    // Simulate a successful response
    nock('http://localhost:3000')
      .defaultReplyHeaders(
        { 'access-control-allow-origin': '*' },
        { 'Access-Control-Allow-Credentials': true },
        { 'Content-Type': 'application/json' }
      )
      .post(
        '/api/login',
        JSON.stringify({
          email: 'kapil.jai@ipragmatech.com',
          password: '123456'
        })
      ) // Route to catch and mock
      .reply(200, userData) // Mock reponse code and data

    // Dispatch action to fetch to-dos
    return store
      .dispatch(
        authorizeActions.dbLogin('kapil.jai@ipragmatech.com', '123456')
      )
      .then(() => {
        // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('Creates Signup when user has been done', () => {
    // Simulate a successful response
    nock('http://localhost:3000')
      .defaultReplyHeaders(
        { 'access-control-allow-origin': '*' },
        { 'Access-Control-Allow-Credentials': true },
        { 'Content-Type': 'application/json' }
      )
      .post(
        '/api/signup',
        JSON.stringify({
          name: 'Kapil Jain',
          email: 'kapil.jain45@ipragmatech.com',
          password: '123456'
        })
      ) // Route to catch and mock
      .reply(200, userData) // Mock reponse code and data

    // Dispatch action to fetch to-dos
    return store

      .dispatch(
        authorizeActions.dbSignup({
          fullName: 'Kapil Jain',
          email: 'kapil.jain45@ipragmatech.com',
          password: '123456'
        })
      )
      .then(() => {
        // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('Signout the user', () => {
    // Simulate a successful response
    nock('http://localhost:3000')
      .defaultReplyHeaders(
        { 'access-control-allow-origin': '*' },
        { 'Access-Control-Allow-Credentials': true },
        { 'Content-Type': 'application/json' }
      )
      .post(
        '/api/signout'
      ) // Route to catch and mock
      .reply(200, userData) // Mock reponse code and data

    // Dispatch action to fetch to-dos
    return store

      .dispatch(
        authorizeActions.dbLogout()
      )
      .then(() => {
        // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

})
