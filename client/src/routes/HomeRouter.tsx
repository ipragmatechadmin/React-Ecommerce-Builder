// - Import react components
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Loadable from 'react-loadable'
import { Map } from 'immutable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'

// - Async Components

const AsyncHomeSections = Loadable({
  loader: () => import('containers/homeSections'),
  loading: MasterLoadingComponent,
})
const AsyncCheckout = Loadable({
  loader: () => import('containers/checkout'),
  loading: MasterLoadingComponent,
})
const AsyncProducts = Loadable({
  loader: () => import('containers/products'),
  loading: MasterLoadingComponent,
})
const AsyncProductDetails = Loadable({
  loader: () => import('containers/productDetails'),
  loading: MasterLoadingComponent,
})
/**
 * Home Router
 */
export class HomeRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data, translate } = this.props
    return (
          enabled ? (
          <Switch>
            <PrivateRoute path='/checkout' component={<AsyncCheckout />} />
            <PublicRoute key='products-by-category-1' path='/productsbycat1/:productsCategoryId' component={<AsyncProducts />} />
            <PublicRoute key='products-by-category-2' path='/productsbycat2/:productsCategoryId' component={<AsyncProducts />} />
            <PublicRoute key='products-by-category-3' path='/productsbycat3/:productsCategoryId' component={<AsyncProducts />} />
            <PublicRoute key='products-by-category-4' path='/productsbycat4/:productsCategoryId' component={<AsyncProducts />} />
            <PublicRoute key='products-by-category-5' path='/productsbycat5/:productsCategoryId' component={<AsyncProducts />} />
            <PublicRoute key='products' path='/products' component={<AsyncProducts />} />
            <PublicRoute path='/productDetail/:productId' component={<AsyncProductDetails />} />
            <PublicRoute path='/' component={<AsyncHomeSections />} />
          </Switch>
          )
          : ''

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IRouterProps) => {

  return {}

}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IRouterProps) => {
  return {
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRouter as any) as any) as typeof HomeRouter
