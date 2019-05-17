import { Map } from 'immutable'
import { connect } from 'react-redux'
import { localize } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

import { productActions } from 'src/store/actions'
import CommonAPI from 'api/CommonAPI'
import ProductDetailComponent from 'src/components/productDetail'

import { ILoginComponentProps } from './IProductsComponentProps'
import { ILoginComponentState } from './IProductsComponentState'

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
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing(2)
  },
  img: {
    width: 300,
    height: 300,
    marginLeft: 20
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
    padding: `${15}px ${60}px`,
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
  }
})

class ProductsComponent extends Component<
  ILoginComponentProps,
  ILoginComponentState
> {
  styles = {
    singinOptions: {
      paddingBottom: 10,
      justifyContent: 'space-around',
      display: 'flex'
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ILoginComponentProps) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: '',
      rating: 3
    }
  }

  componentWillMount() {
    const { loadData } = this.props
    loadData!()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const {
      mergedProductDetail,
      mergedProductsAttributes
    } = this.props

    return (
      <ProductDetailComponent product={mergedProductDetail} mergedProductsAttributes={mergedProductsAttributes}  />
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: ILoginComponentProps) => {
  const { productId } = ownProps.match.params
  return {
    loadData: () => {
      dispatch(productActions.dbGetProducts())
      dispatch(productActions.dbGetProductsAttributes(productId))
      dispatch(productActions.dbGetProductById(productId))
    }

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (
  state: Map<string, any>,
  ownProps: ILoginComponentProps
) => {
  const { productId } = ownProps.match.params
  let mergedProducts = Map({})
  const products = state.getIn(['products', 'userProducts'])
  mergedProducts = mergedProducts.merge(products)
  let mergedProductDetail = Map({})
  const product = state.getIn(['products', 'product'])
  mergedProductDetail = mergedProductDetail.merge(product)
  let mergedProductsAttributes = Map({})
  const productsAttributes = state.getIn(['products', 'userProductsAttributes'])
  mergedProductsAttributes = mergedProductsAttributes.merge(productsAttributes)

  return {
    mergedProducts,
    product,
    mergedProductsAttributes,
    mergedProductDetail
  }
}

// - Connect component to redux store
export default withRouter<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles as any)(localize(
    ProductsComponent as any,
    'locale',
    CommonAPI.getStateSlice
  ) as any) as any)
) as typeof ProductsComponent
