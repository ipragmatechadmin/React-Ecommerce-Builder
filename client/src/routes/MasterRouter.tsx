// - Import react components
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import Loadable from 'react-loadable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'

// - Async Components
const AsyncHome: any = Loadable({
  loader: () => import('containers/home'),
  loading: MasterLoadingComponent,
})
const AsyncSignup = Loadable({
  loader: () => import('containers/signup'),
  loading: MasterLoadingComponent,
})
const AsyncLogin = Loadable({
  loader: () => import('containers/login'),
  loading: MasterLoadingComponent,
})

/**
 * Master router
 */
export class MasterRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data } = this.props
    return (
        <Switch>
          <Route path='/signup' component={AsyncSignup} />
          <PublicRoute path='/login' component={<AsyncLogin />} />
          <Route render={() => <AsyncHome uid={data.uid} />} />
        </Switch>
    )
  }
}
export default withRouter<any>(connect(null, null)(MasterRouter as any)) as typeof MasterRouter
