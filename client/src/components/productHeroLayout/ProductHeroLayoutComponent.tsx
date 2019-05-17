// - Import react components
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

import LayoutBody from 'src/components/layoutBody'
import clsx from 'clsx'

import { IProductHeroLayoutComponentProps } from './IProductHeroLayoutComponentProps'
import { IProductHeroLayoutComponentState } from './IProductHeroLayoutComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      height: '100vh',
      maxHeight: 1300,
    },
    [theme.breakpoints.only('md')]: {
      height: '80vh'
    },
    [theme.breakpoints.only('sm')]: {
      height: '60vh'
    },
    [theme.breakpoints.only('xs')]: {
      height: '30vh'
    }
  },
  layoutBody: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
})

/**
 * Create component class
 */
export class ProductHeroLayoutComponent extends Component<IProductHeroLayoutComponentProps,IProductHeroLayoutComponentState> {

  static propTypes = {
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IProductHeroLayoutComponentProps) {
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
    const { backgroundClassName, children, classes } = this.props
    return (
      <section className={classes.root}>
        <LayoutBody className={classes.layoutBody} width='full'>
          {children}
          <div className={clsx(classes.background, backgroundClassName)} />
        </LayoutBody>
      </section>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IProductHeroLayoutComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IProductHeroLayoutComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(ProductHeroLayoutComponent as any) as any)) as typeof ProductHeroLayoutComponent
