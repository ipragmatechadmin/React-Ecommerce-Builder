// - Import react components
import { capitalize } from '@material-ui/core/utils/helpers'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import clsx from 'clsx'

import { ILayoutBodyComponentProps } from './ILayoutBodyComponentProps'
import { ILayoutBodyComponentState } from './ILayoutBodyComponentState'

// - Import API

// - Import actions

function round(value: any) {
  return Math.round(value * 1e4) / 1e4
}
const styles = (theme: any) => ({
  margin: {
    margin: theme.spacing(7),
  },
  marginBottom: {
    marginBottom: theme.spacing(12),
  },
  widthSmall: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(660 + theme.spacing(6))]: {
      width: 660,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  widthMedium: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(850 + theme.spacing(6))]: {
      width: 850,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  widthLarge: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: 880,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(round(880 / 0.7777))]: {
      width: '77.7777%',
    },
    [theme.breakpoints.up(round(1400 / 0.7777))]: {
      width: 1400,
    },
  },
  widthXlarge: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(round(900 / 0.9))]: {
      width: '90%',
    },
    [theme.breakpoints.up(round(1800 / 0.9))]: {
      width: 1800,
    },
  },
  widthFull: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
})

/**
 * Create component class
 */
export class LayoutBodyComponent extends Component<ILayoutBodyComponentProps,ILayoutBodyComponentState> {
  static defaultProps = {
    component: 'div',
    fullHeight: false,
    fullWidth: false,
    margin: false,
    marginBottom: false,
    width: 'medium',
  }
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fullHeight: PropTypes.bool,
    fullWidth: PropTypes.bool,
    margin: PropTypes.bool,
    marginBottom: PropTypes.bool,
    style: PropTypes.object,
    width: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'full']),
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: ILayoutBodyComponentProps) {
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

    const {
      children,
      classes,
      className,
      component: Component,
      fullHeight,
      fullWidth,
      margin,
      marginBottom,
      style,
      width,
      ...other
    } = this.props
    const styles = {}

    return (
      <Component
        className={clsx(
          classes.root,
          {
            [classes[`width${capitalize(width)}`]]: !fullWidth,
            [classes.fullHeight]: fullHeight,
            [classes.margin]: margin,
            [classes.marginBottom]: marginBottom,
          },
          className,
        )}
        style={style}
        {...other}
      >
        {children}
      </Component>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: ILayoutBodyComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ILayoutBodyComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(LayoutBodyComponent as any) as any)) as typeof LayoutBodyComponent
