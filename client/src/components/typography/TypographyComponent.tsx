// - Import react components
import { capitalize } from '@material-ui/core/utils/helpers'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MuiTypography from '@material-ui/core/Typography'
import React, { Component } from 'react'

import { ITypographyComponentProps } from './ITypographyComponentProps'
import { ITypographyComponentState } from './ITypographyComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  markedH2Center: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH3Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH4Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH6Left: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor',
  },
})

/**
 * Create component class
 */
export class TypographyComponent extends Component<ITypographyComponentProps,ITypographyComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: ITypographyComponentProps) {
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
    const variantMapping = {
      button: 'button',
      caption: 'caption',
      h1: 'h1',
      h2: 'h1',
      h3: 'h1',
      h4: 'h1',
      h5: 'h3',
      h6: 'h2',
      overline: 'overline',
      subtitle1: 'h3',
      subtitle2: 'subtitle2',
      body1: 'body1',
      body2: 'body2',
      srOnly: 'srOnly'
    }
    const { children, classes, marked, variant, ...other } = this.props
    return (
      <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
        {children}
        {marked ? (
          <span className={classes[`marked${capitalize(variant) + capitalize(marked)}`]} />
        ) : null}
      </MuiTypography>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: ITypographyComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ITypographyComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(TypographyComponent as any) as any)) as typeof TypographyComponent
