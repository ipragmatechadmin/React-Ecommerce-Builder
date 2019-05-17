// - Import react components
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import LayoutBody from 'src/components/layoutBody'

import { IAppFormComponentProps } from './IAppFormComponentProps'
import { IAppFormComponentState } from './IAppFormComponentState'
import Paper from '../../components/Paper'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    backgroundImage: 'url(/static/onepirate/appCurvyLines.png)',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    padding: theme.spacing(4, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10, 8),
    },
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 36px 0 rgba(0,0,0,0.2), 0 6px 30px 0 rgba(0,0,0,0.19)',

  },
})

/**
 * Create component class
 */
export class AppFormComponent extends Component<IAppFormComponentProps,IAppFormComponentState> {

  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IAppFormComponentProps) {
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
    const { children, classes } = this.props
    return (
      <div className={classes.root}>
        <LayoutBody margin marginBottom width='small'>
          <Paper className={classes.paper}>{children}</Paper>
        </LayoutBody>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IAppFormComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IAppFormComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(AppFormComponent as any) as any)) as typeof AppFormComponent
