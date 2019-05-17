// - Import react components
import 'react-toastify/dist/ReactToastify.css'

import { Map } from 'immutable'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { getTranslate } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Favorite from '@material-ui/icons/FavoriteBorder'
import Grid from '@material-ui/core/Grid/Grid'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import ReactImageFallback from 'react-image-fallback'
import RemoveIcon from '@material-ui/icons/Remove'
import StarRatingComponent from 'react-star-rating-component'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { Cart } from 'core/domain/cart'
import * as addToCartActions from 'store/actions/addToCartActions'

import { IProductDetailComponentProps } from './IProductDetailComponentProps'
import { IProductDetailComponentState } from './IProductDetailComponentState'

import uniqid from 'uniqid'

const styles = (theme: any) => ({
  root: {
    display: 'flex'
  },
  demo: {
    height: 240
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    color: theme.palette.text.secondary,
    boxShadow: '0 0 0 0'
  },
  control: {
    padding: theme.spacing(2)
  },
  img: {
    margin: 20
  },
  postBody: {
    wordWrap: 'break-word',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
    display: 'flex',
    padding: 5,
    paddignBottom: 5,
    flex: 1
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${15}px ${35}px`,
    boxShadow: 'none'
  },
  btnIncrement: {
    color: '#072a48',
    backgroundColor: 'white',
    border: 'solid',
    borderColor: '#072a48',
    width: '30px',
    cursor: 'pointer',
    borderWidth: '0.1ex'
  },
  btnDelete: {
    color: 'white',
    backgroundColor: '#072a48',
    border: 'solid',
    borderColor: '#072a48',
    width: '30px',
    cursor: 'pointer',
    borderWidth: '0.1ex'
  },
  paperbuttons: {
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: `${24}px ${48}px`
    }
  },
  dialogShoppingButton: {
    backgroundColor: '#ffffff',
    color: '#f62f5e'
  },
  bootstrapInput: {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 12,
    width: '20px',
    padding: '5px 6px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
    // Use the system font instead of the default Roboto font.
  },
  borderbottom: {
    borderBottom: 'none'
  },
  fab: {
    backgroundColor: 'white',
    boxShadow: 'none',
    color: '#f62f5e',
    textTransform: 'capitalize'
  },
  quentityButton: {
    margin: '5px',
    width: '30px',
    height: '30px',
    minHeight: '30px',
    boxShadow: 'none',
    backgroundColor: '#efefef',
    color: '#2e2e2e'
  }
})

/**
 * Create component class
 */
export class ProductDetailComponent extends Component<
  IProductDetailComponentProps,
  IProductDetailComponentState
> {
  styles = {}

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IProductDetailComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: '',
      rating: 3,
      open: false,
      quantity: 1,
      show: true,
      max: 5,
      min: 0,
      cardId: '',
      sizeValue: '',
      colorValue: ''
    }

    // Binding functions to `this`
    // Binding function to `this`
    this.addToCart = this.addToCart.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.loadSizeAttributes = this.loadSizeAttributes.bind(this)
    this.loadColorAttributes = this.loadColorAttributes.bind(this)
    this.incrementItem = this.incrementItem.bind(this)
    this.decreaseItem = this.decreaseItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
  }

  /**
   * Create a list of size Attributes
   * @return {DOM} posts
   */
  loadSizeAttributes = () => {
    const { mergedProductsAttributes } = this.props
    let productSizeAttributes: any = []
    mergedProductsAttributes.map((x, index) => {
      let newPost: any =
        x.get('attributeName') === 'Size' ? (
          <Button
            color='secondary'
            key={x.get('attributeValueId')}
            id={x.get('attributeValue')}
            onClick={this.handleSizeChange}
          >
            {x.get('attributeValue')}
          </Button>
        ) : (
          ''
        )

      productSizeAttributes.push(newPost as never)
    })
    return productSizeAttributes
  }

  handleSizeChange = (event: any) => {
    this.setState({ sizeValue: event.target.id })
  }

  handleColorChange = (event: any) => {
    this.setState({ colorValue: event.target.id })
  }

  /**
   * Create a list of size Attributes
   * @return {DOM} posts
   */
  loadColorAttributes = () => {
    const { mergedProductsAttributes } = this.props
    let productColorAttributes: any = []
    const styles = (x: any, selectedColor: any) => ({
      backgroundColor: x,
      margin: '3px',
      width: '30px',
      height: '30px',
      display: 'inline-block',
      cursor: 'pointer',
      borderRadius: '50%',
      boxShadow:
        x === selectedColor
          ? '0px 0px 6px 1px rgba(0,0,0,1)'
          : '0px 0px 2px 1px rgba(0,0,0,1)'
    })
    mergedProductsAttributes.map((x, index) => {
      let newPost: any =
        x.get('attributeName') === 'Color' ? (
          // <Button color='secondary' key={x.get('attributeValueId')}>
          //   {x.get('attributeValue')}
          // </Button>
          x.get('attributeValue') === 'White' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#ffffff', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Black' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#000000', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Red' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#FF0000', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Orange' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#FFA500', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Yellow' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#FFFF00', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Green' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#008000', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Blue' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#0000FF', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Indigo' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#4B0082', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : x.get('attributeValue') === 'Purple' ? (
            <div
              key={x.get('attributeValue')}
              style={styles('#800080', '')}
              id={x.get('attributeValue')}
              onClick={this.handleColorChange}
            />
          ) : (
            ''
          )
        ) : (
          ''
        )

      productColorAttributes.push(newPost as never)
    })
    return productColorAttributes
  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'emailInput':
        this.setState({
          emailInputError: ''
        })
        break
      case 'passwordInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })

        break
      default:
    }
  }

  addToCart = () => {
    const { authed, goTo } = this.props
    if (!authed) {
      goTo!('/login')
      return
    }

    const { product, cart } = this.props
    let cartId
    if (cart && Object.keys(cart).length > 0) {
      cartId = Object.keys(cart)[0]
    } else {
      cartId = uniqid()
    }
    this.props.addToCart!(cartId, {
      productThumbnail: product.get('thumbnail'),
      productName: product.get('name'),
      productPrice: product.get('price'),
      productId: product.get('productId'),
      productColor: this.state.colorValue,
      productQuantity: this.state.quantity,
      productSize: this.state.sizeValue
    })
  }

  /**
   * Handle Dialog close
   */
  handleClose = () => {
    this.setState({ open: false })
  }

  /**
   * Handle register form
   */
  handleForm = () => {
    const { translate } = this.props
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: translate!('login.emailRequiredError')
      })
      error = true
    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: translate!('login.passwordRequiredError')
      })
      error = true
    }

    if (!error) {
      this.props.login!(this.state.emailInput, this.state.passwordInput)
    }
  }

  changeRating(newRating: any, name: any) {
    this.setState({
      rating: newRating
    })
  }

  onStarClick(nextValue: any, prevValue: any, name: any) {
    this.setState({ rating: nextValue })
  }

  incrementItem = () => {
    this.setState(prevState => {
      if (prevState.quantity < 9) {
        return {
          quantity: prevState.quantity + 1
        }
      } else {
        return null
      }
    })
  }

  decreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
        }
      } else {
        return null
      }
    })
  }
  handleChange = (event: any) => {
    this.setState({ quantity: event.target.value })
  }

  componentWillMount() {
    this.setState({ cartId: '' })
  }

  notify = () => {
    toast.success(this.props.translate!('common.featureImplementLater'), {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: '#ff3366'
      })
    })
  }
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    let { product } = this.props
    const { classes, translate } = this.props
    const productSizeAttributes = this.loadSizeAttributes()
    const productColorAttributes = this.loadColorAttributes()
    return (
      <React.Fragment>
        <Card key={`post-component-${'id'}`} style={{ margin: 5 }}>
          <CardContent
            className={classes.postBody}
            style={{ paddingBottom: 5 }}
          >
            <CardMedia className='productImage'>
              <ReactImageFallback
                src={`/images/${product.get('image')}`}
                fallbackImage={'/images/product_placeholder.png'}
                initialImage={`/images/product_loading.png`}
                alt='productImage'
                className={classes.img}
              />
            </CardMedia>

            <div className='mainContent'>
              <StarRatingComponent
                name='rate1'
                starCount={5}
                value={4}
                onStarClick={this.onStarClick.bind(this)}
              />
              <Typography style={{ lineHeight: 1.1 }} variant='h5'>
                {product.get('description')}
              </Typography>
              <Typography color='error'>
                {translate!('product.currency')} {product.get('price')}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                Color
              </Typography>
              {productColorAttributes}
              {/* {availableColors.map(x => (
                <div key={x} style={styles(x, '')} />
              ))} */}

              <Typography variant='subtitle1' color='textSecondary'>
                Size
              </Typography>
              {productSizeAttributes}
              {/* {mergedProductsAttributes.map(x => (

                x.get('attributeName') === 'Size' ? <Button
                      color='secondary'
                      key={x.get('attributeValueId')}>
                      {x.get('attributeValue')}
                    </Button> : ''
              ))} */}

              {/* {availableSizes.map(x => (
                  <Button color='secondary' key={x}>
                    {x}
                  </Button>
                ))} */}

              <Typography variant='subtitle1' color='textSecondary'>
                Quantity
              </Typography>
              <Fab
                color='secondary'
                className={classes.quentityButton}
                size='small'
                aria-label='Add'
                onClick={this.incrementItem}
              >
                <AddIcon />
              </Fab>
              <InputBase
                id='bootstrap-input'
                value={this.state.quantity}
                onChange={this.handleChange}
                classes={{
                  input: classes.bootstrapInput
                }}
              />
              <Fab
                color='secondary'
                aria-label='Add'
                className={classes.quentityButton}
                size='small'
                onClick={this.decreaseItem}
              >
                <RemoveIcon />
              </Fab>
              <Typography style={{ margin: 10 }} />

              <Paper className={classes.paper}>
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      container
                      xs={6}
                      sm={3}
                      direction='row'
                      justify='flex-start'
                      alignItems='center'
                    >
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={this.addToCart}
                        className={classes.button}
                      >
                        {translate!('product.addToCart')}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={3}
                      container
                      direction='row'
                      justify='flex-end'
                      alignItems='center'
                      onClick={this.notify}
                    >
                      <Favorite color='secondary' />
                      <Typography>
                        {translate!('product.addToWishList')}
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              </Paper>
            </div>
          </CardContent>
        </Card>
        <Card
          key={`post-component-${'id'}`}
          style={{ margin: 5, backgroundColor: '#FaFaFa', padding: 10 }}
        >
          <CardHeader title={'Product Reviews'} />

          <CardContent style={{ paddingBottom: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <StarRatingComponent
                  name='rate1'
                  starCount={5}
                  value={4}
                  onStarClick={this.onStarClick.bind(this)}
                />
                <Typography>Pablo Permins</Typography>
                <Typography color='textSecondary'>one hour ago</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Got this through the post the other day and right from opening
                  the packet. I knew this was quality, put it on and i was right
                </Typography>
              </Grid>
            </Grid>

            <Divider
              variant='middle'
              style={{ marginTop: 10, marginBottom: 10 }}
            />

            <Typography variant='h5'>Add A Review</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography>Choose a Nick name</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{
                    className: classes.formLabel
                  }}
                  InputProps={{
                    classes: {
                      root: classes.root,
                      input: classes.inputSizeSmall
                    }
                  }}
                  required
                  id='nickname'
                  name='nickName'
                  label='Nick Name'
                  fullWidth
                  autoComplete='nickName'
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography>Your Review</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{
                    className: classes.formLabel
                  }}
                  InputProps={{
                    classes: {
                      root: classes.root,
                      input: classes.inputSizeSmall
                    }
                  }}
                  required
                  id='review'
                  name='review'
                  label='Review'
                  fullWidth
                  autoComplete='billing address-level2'
                  variant='outlined'
                />
                <Typography color='textSecondary'>
                  You review must be at leat 50 characters
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography>Over All Rating</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StarRatingComponent
                  name='rate1'
                  starCount={5}
                  value={4}
                  onStarClick={this.onStarClick.bind(this)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3} />
              <Grid item xs={12} sm={6}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={this.notify}
                  className={classes.button}
                >
                  {'Submit'}
                </Button>
              </Grid>
            </Grid>

            <ToastContainer autoClose={2000} />
          </CardContent>
        </Card>
      </React.Fragment>
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
  dispatch: any,
  ownProps: IProductDetailComponentProps
) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    addToCart: (cartId: string, cart: Cart) => {
      dispatch(addToCartActions.dbAddProductToCart(cartId, cart))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (
  state: Map<string, any>,
  ownProps: IProductDetailComponentProps
) => {
  return {
    translate: getTranslate(state.get('locale')),
    authed: state.getIn(['authorize', 'authed'], false),
    avatarURL: state.getIn(['imageGallery', 'imageURLList']),
    imageRequests: state.getIn(['imageGallery', 'imageRequests']),
    cart: state.getIn(['addToCart', 'cartProducts']).toJS()
  }
}

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(ProductDetailComponent as any) as any)
