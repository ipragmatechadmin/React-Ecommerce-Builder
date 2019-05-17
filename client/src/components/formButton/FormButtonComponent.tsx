// - Import react components
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import React, { Component } from 'react'

import { IFormButtonComponentProps } from './IFormButtonComponentProps'
import { IFormButtonComponentState } from './IFormButtonComponentState'

const styles = (theme: any) => ({
  root: {
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    padding: `${theme.spacing(2) - 1}px ${theme.spacing(4)}px`,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none',
    },
    '&:hover': {
      color: '#f62f5e',
    },
  },
  sizeSmall: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    fontSize: theme.typography.pxToRem(13),
    color: '#fff',
    backgroundColor: '#f62f5e'
  },
  sizeLarge: {
    padding: `${theme.spacing(3) - 3}px ${theme.spacing(6)}px`,
    fontSize: theme.typography.pxToRem(16),
    color: '#fff',
    backgroundColor: '#f62f5e'
  }
})

/**
 * Create component class
 */
export class FormButtonComponent extends Component<IFormButtonComponentProps,IFormButtonComponentState> {
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IFormButtonComponentProps) {
    super(props)
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    return (
      <Button {...this.props} />
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFormButtonComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IFormButtonComponentProps) => {
  return {
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(FormButtonComponent as any)as any)
