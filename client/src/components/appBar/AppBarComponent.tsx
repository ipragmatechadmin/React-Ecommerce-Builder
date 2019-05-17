// - Import react components
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import React, { Component } from 'react'

import { IAppBarComponentProps } from './IAppBarComponentProps'
import { IAppBarComponentState } from './IAppBarComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    color: theme.palette.common.white,
  },
})

/**
 * Create component class
 */
export class AppBarComponent extends Component<IAppBarComponentProps,IAppBarComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IAppBarComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

        // Binding functions to `this`

  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const {...props} = this.props

    return (
      <MuiAppBar elevation={0} position='static' {...props} />
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IAppBarComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IAppBarComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(AppBarComponent as any) as any)) as typeof AppBarComponent
