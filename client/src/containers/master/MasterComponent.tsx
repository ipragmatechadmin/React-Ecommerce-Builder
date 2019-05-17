// - Import react components
import {Map} from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import { IAuthorizeService } from 'src/core/services/authorize'
import { IShippingService } from 'src/core/services/shippings'
import { ServiceProvide, IServiceProvider } from 'src/core/factories'
import {
  authorizeActions,
  globalActions,
  shippingsActions
} from 'src/store/actions'
import MasterRouter from 'src/routes/MasterRouter'

import { IMasterComponentProps } from './IMasterComponentProps'
import { IMasterComponentState } from './IMasterComponentState'

/* ------------------------------------ */

// - Create Master component class
export class MasterComponent extends Component<IMasterComponentProps, IMasterComponentState> {

  static isPrivate = true

  private readonly _serviceProvider: IServiceProvider
  private readonly _authourizeService: IAuthorizeService
  private readonly _shippingService: IShippingService
  // Constructor
  constructor (props: IMasterComponentProps) {
    super(props)

    this._serviceProvider = new ServiceProvide()
    this._authourizeService = this._serviceProvider.createAuthorizeService()
    this._shippingService = this._serviceProvider.createShippingService()
    this.state = {
      loading: true,
      authed: false,
      dataLoaded: false,
      isVerifide: false
    }

    // Binding functions to `this`
    this.handleMessage = this.handleMessage.bind(this)

  }

  // Handle click on message
  handleMessage = (evt: any) => {
    this.props.closeMessage()
  }

  componentDidCatch (error: any, info: any) {
    console.log('===========Catched by React componentDidCatch==============')
    console.log(error, info)
    console.log('====================================')
  }

  componentDidMount () {

    this._authourizeService.onAuthStateChanged((isVerifide: boolean, user: any) => {
      const {
        login,
        getShipping,
        logout,
        hideMasterLoading,
      } = this.props
      if (user) {
        login(user.userId,user.email, user.fullName)
        hideMasterLoading!()
        this.setState({
          loading: false,
          isVerifide: true
        })
        if (user.userId) {
          getShipping()
        }

      } else {
        logout()
        hideMasterLoading!()
        this.setState({
          loading: false,
          isVerifide: false
        })
        // if (global.defaultLoadDataStatus) {
        //   defaultDataDisable()
        //   clearData()
        // }
        // loadDataGuest()
      }
    })

  }

  /**
   * Render app DOM component
   *
   * @returns
   *
   * @memberof Master
   */
  public render () {

    const { uid, hideMessage } = this.props
    const { loading } = this.state

    return (
      <React.Fragment>
        <MasterRouter enabled={!loading} data={{uid}} />
        <Snackbar
          open={this.props.global.messageOpen}
          message={this.props.global.message}
          onClose={hideMessage}
          autoHideDuration={4000}
          style={{ left: '1%', transform: 'none' }}
        />
      </React.Fragment>
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IMasterComponentProps) => {

  return {
    clearData: () => {
      dispatch(globalActions.clearTemp())

    },
    login: (userId: string, email: string, displayName: string) => {
      dispatch(authorizeActions.login(userId, email, displayName, userId ? true : false))
    },
    getShipping: () => {
      dispatch(shippingsActions.dbGetShippingAddressRefresh())
    },
    logout: (msg: string, status: boolean) => {
      dispatch(authorizeActions.logout(msg, status))
    },
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    closeMessage: () => {
      dispatch(globalActions.hideMessage())
    },
    loadDataGuest: () => {
      dispatch(globalActions.loadDataGuest())
    },
    showMasterLoading: () => dispatch(globalActions.showMasterLoading()),
    hideMasterLoading: () => dispatch(globalActions.hideMasterLoading()),
    hideMessage: () => dispatch(globalActions.hideMessage())
  }

}

/**
 * Map state to props
 * @param {object} state
 */
const mapStateToProps = (state: Map<string, any>) => {
  // FIXME: Never use toJS() in mapStateToProps https://redux.js.org/recipes/usingimmutablejs
  const  authorize = Map(state.get('authorize', {})).toJS() as any
  const global = Map(state.get('global', {})).toJS() as any
  const { sendFeedbackStatus, progress } = global
  return {
    sendFeedbackStatus,
    progress,
    guest: authorize.guest,
    uid: authorize.uid,
    authed: authorize.authed,
    global: global
  }

}
// - Connect commponent to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterComponent as any) as any)
