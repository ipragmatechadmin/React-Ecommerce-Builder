import { useEcommercestore } from './data/ecommerceClient/dependecyRegisterar'
import { Container } from 'inversify'
import CommonAPI from 'api/CommonAPI'

/**
 * Developer tools
 */
window['console']['trace'] = CommonAPI.logger

/**
 * Initialize container
 */
export const provider = new Container()

/**
 * Register dependencies
 */
useEcommercestore(provider)
// Features on the roadmap
// useAzure(provider)
// userAspNet(provider)
// useFirebase(provider)
// useAws(provider)
