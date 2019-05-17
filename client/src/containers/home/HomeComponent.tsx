// - Import react components
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

import { HomeRouter } from 'routes'
import {
  globalActions,
  productActions,
  shippingsActions
} from 'src/store/actions'
import AppFooter from 'src/components/appFooter'
import TopAppBar from 'src/components/topAppBar'

import { IHomeComponentProps } from './IHomeComponentProps'
import { IHomeComponentState } from './IHomeComponentState'

const drawerWidth = 220
const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    maxWidth: drawerWidth,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  drawerPaperLarge: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%',
    },
    top: 70,
    backgroundColor: '#fafafa',
    borderRight: 0
  },
  menu: {
    height: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  'content-left': {
    marginLeft: 0,
  },
  'content-right': {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    }
  },
  'contentShift-right': {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth
    }
  }
})

// - Create Home component class
export class HomeComponent extends Component<IHomeComponentProps, IHomeComponentState> {

  // Constructor
  constructor(props: IHomeComponentProps) {
    super(props)

    // Default state
    this.state = {
      drawerOpen: false
    }

    // Binding function to `this`

  }

  /**
   * Handle drawer toggle
   */
  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  componentWillMount() {
    const { loadData, authed, defaultDataEnable, loadShippingAddress } = this.props
     // clearData!()
      loadData!()
      defaultDataEnable!()
      if (authed) {
        loadShippingAddress!()
      }
  }

  /**
   * Render DOM component
   *
   * @returns DOM
   *
   * @memberof Home
   */
  render() {
    const HR = HomeRouter
    return (
      <React.Fragment>
        <TopAppBar />
        <HR enabled={true} />
        <AppFooter />
      </React.Fragment>
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IHomeComponentProps) => {

  return {
    loadData: () => {
      dispatch(productActions.dbGetProducts())
      dispatch(shippingsActions.dbGetShippingRegions())

    },
    loadShippingAddress: () => {
      dispatch(shippingsActions.dbGetShippingAddress())
    },
    clearData: () => {
      dispatch(globalActions.clearTemp())

    },
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    goTo: (url: string) => dispatch(push(url)),
    showSendFeedback: () => dispatch(globalActions.showSendFeedback()),
    hideSendFeedback: () => dispatch(globalActions.hideSendFeedback())

  }

}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IHomeComponentProps) => {
  const global = state.get('global', {})
  return {
    authed: state.getIn(['authorize', 'authed'], false),
    isVerifide: state.getIn(['authorize', 'isVerifide'], false),
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
    global,
    loaded: true
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(HomeComponent as any) as any)) as typeof HomeComponent
