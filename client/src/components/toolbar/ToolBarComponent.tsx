// - Import react components
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MuiToolbar from '@material-ui/core/Toolbar'
import React, { Component } from 'react'

import { IToolBarComponentProps } from './IToolBarComponentProps'
import { IToolBarComponentState } from './IToolBarComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    height: 70,
    backgroundColor: '#ffffff',
    [theme.breakpoints.up('sm')]: {
      height: 80,
    },
  },
})

/**
 * Create component class
 */
export class ToolBarComponent extends Component<IToolBarComponentProps,IToolBarComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IToolBarComponentProps) {
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
    const styles = {}

    return (
      <MuiToolbar {...props} />
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IToolBarComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IToolBarComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(ToolBarComponent as any) as any)) as typeof ToolBarComponent
