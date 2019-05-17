// - Import react components
import { Map } from 'immutable'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import { Cart } from 'core/domain/cart'
import * as addToCartActions from 'store/actions/addToCartActions'

import { IProductComponentProps } from './IProductComponentProps'
import { IProductComponentState } from './IProductComponentState'
import FormButton from '../formButton'
import uniqid from 'uniqid'

const styles = (theme: any) => ({
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    color: theme.palette.text.secondary,
    textAlign: 'center'
  },
})

/**
 * Create component class
 */
export class ProductComponent extends Component<IProductComponentProps,IProductComponentState> {

  styles = {
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IProductComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`
    this.handleBuyNow = this.handleBuyNow.bind(this)

  }

  /**
   * Will be called when buynow button is pressed
   *
   * @memberof Product
   */
  handleBuyNow = (product: any) => {
    const { authed, goTo } = this.props
     if (!authed) {
       goTo!('/login')
       return
     }

     const{cart} = this.props
     const cartProduct: any[] = []
     let cartId
     var cartSubTotal = 0
     if (cart && Object.keys(cart).length > 0) {
       cartId = Object.keys(cart)[0]
       console.log('cart id coming while updatin the cart',cartId)
     } else {
       cartId = uniqid()
     }

    this.props.addToCart!(cartId,{
      productThumbnail: product.get('thumbnail'),
      productName: product.get('name'),
      productPrice: product.get('price'),
      productId: product.get('productId'),
      productColor: 'blue',
      productQuantity: 1,
      productSize: 'L'
    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    let { product, goTo, cart } = this.props
    const {classes, translate} = this.props
    return (
        <Grid key={product.get('productId')} item xs={3}>
          <Paper className={classes.paper}>
          <NavLink
                    to={{
                        pathname: `/productDetail/` + product.get('productId'),
                    }}
                    onClick={evt => {
                        evt.preventDefault()
                        goTo!(`/productDetail/` + product.get('productId'))
                    }}
                >
            <img
              className={classes.img}
              alt='complex'
              src={`/images/${product.get('thumbnail')}`}
            />
            <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
              {product.get('name')}
            </Typography>
            <Typography color='error' style={{ textAlign: 'center' }}>
              {translate!('product.currency')}{product.get('price')}
            </Typography>
            </NavLink>
            <FormButton
              size='small'
              align='center'
              color='secondary'
              onClick={() => this.handleBuyNow(product)}
            >
              {translate!('product.buynow')}
            </FormButton>
          </Paper>
        </Grid>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IProductComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    addToCart: (cartId: string, cart: Cart) => {
      dispatch(addToCartActions.dbAddProductToCart(cartId,cart))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProductComponentProps) => {
  return {
    translate: getTranslate(state.get('locale')),
    avatarURL: state.getIn(['imageGallery', 'imageURLList']),
    authed: state.getIn(['authorize', 'authed'], false),
    imageRequests: state.getIn(['imageGallery', 'imageRequests']),
    cart: state.getIn(['addToCart', 'cartProducts']).toJS()
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ProductComponent as any)as any)
