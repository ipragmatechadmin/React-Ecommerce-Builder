// - Import react components
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

import { IProductHeroComponentProps } from './IProductHeroComponentProps'
import { IProductHeroComponentState } from './IProductHeroComponentState'
import ProductHeroLayout from '../productHeroLayout'

const backgroundImage = '../styles/images/home-hero.png?auto=format&fit=crop&w=1400&q=80'

const styles = (theme: any) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center'
  }
})

/**
 * Create component class
 */
export class ProductHeroComponent extends Component<
  IProductHeroComponentProps,
  IProductHeroComponentState
> {
  static propTypes = {}

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IProductHeroComponentProps) {
    super(props)

    // Defaul state
    this.state = {}
    // Binding functions to `this`
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, backgroundImage, goTo } = this.props
    return (
      <ProductHeroLayout backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: 'none' }}
          src={backgroundImage}
          alt=''
          onClick={(evt: any) => {
            evt.preventDefault()
            goTo!(`/products`)
          }}
        />
      </ProductHeroLayout>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (
  dispatch: Function,
  ownProps: IProductHeroComponentProps
) => {
  return {
    goTo: (url: string) => dispatch(push(url))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IProductHeroComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles as any, { withTheme: true })(
    ProductHeroComponent as any
  ) as any)
) as typeof ProductHeroComponent
