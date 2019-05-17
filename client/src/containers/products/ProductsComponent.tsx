import 'react-toastify/dist/ReactToastify.css'

import { CardContent } from '@material-ui/core'
import { Map } from 'immutable'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { localize } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/lab/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { productActions } from 'src/store/actions'
import CommonAPI from 'api/CommonAPI'
import FormButton from 'src/components/formButton'
import ProductComponent from 'src/components/product'
import * as userActions from 'store/actions/userActions'

import { IProductsComponentProps } from './IProductsComponentProps'
import { IProductsComponentState} from './IProductsComponentState'

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
  },
  control: {
    padding: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  button: {
    margin: 5,
    borderRadius: 30,
    padding: 15,
    display: 'inline-block',
  },
  slider: {
    padding: '22px 0px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  filterlabel: {
    '&$cssFocused $notchedOutline:': {
      position: 'absolute',
      top: 0,
      textAlign: 'left',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

class ProductsComponent extends Component<
  IProductsComponentProps,
  IProductsComponentState
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
  constructor(props: IProductsComponentProps) {
    super(props)
    const availablePaging = [
      'Cheap Monday',
      'ASOS',
      'Adidas Original',
      'Abercrombie & Fitch',
      'ASOS',
      'Cheap Monday',
      'ASOS',
      'Adidas Original',
      'Abercrombie & Fitch',
      'ASOS',
      'Cheap Monday',
      'ASOS',
      'Adidas Original',
      'Abercrombie & Fitch',
      'ASOS',
      'Cheap Monday',
      'ASOS',
      'Adidas Original',
      'Abercrombie & Fitch',
      'ASOS'
    ]
    // an example array of items to be paged
    var exampleItems = availablePaging.map(i => ({
      id: i + 1,
      name: 'Item ' + (i + 1)
    }))

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: '',
      value: 3,
      exampleItems: exampleItems,
      pageOfItems: [],
      data: [],
      offset: 0,
      searchText: ''
    }

    // Binding function to `this`
    this.handleForm = this.handleForm.bind(this)
    this.productLoad = this.productLoad.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
    this.notify = this.notify.bind(this)
  }

  onChangePage(pageOfItems: any) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  /**
   * Create a list of posts
   * @return {DOM} posts
   */
  productLoad = () => {
    const { mergedProducts } = this.props
    let productList: any = []
    mergedProducts.map((product, index) => {
      let newProduct: any = (
        <ProductComponent key={product.get('productId')} product={product! as any}  />
      )

      productList.push(newProduct as never)
    })
    return productList
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

    // if (!error) {
    //   this.props.login!(this.state.emailInput, this.state.passwordInput)
    // }
  }

  componentWillMount() {
    const { loadData } = this.props
    loadData!()
  }

  handleChangeGender = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value })
  }
  handleChangeCasual = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value })
  }
  handleChangeColor = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value })
  }
  handleChange = (event: any, value: any) => {
    this.setState({ value })
  }
  handleChangeCheckedBrand = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.checked })
  }
  handlePageClick = (data: any) => {
    let selected = data.selected
    let offset = Math.ceil(selected + 1)

    this.setState({ offset: offset }, () => {
      this.props.loadProductsStream!(this.state.offset, 10)
    })
  }
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.value
    if ( value === '') {
      this.props.clearSearchList!()
      this.props.loadProductsStream!(this.state.offset, 10)
    } else {
      this.setState( { searchText: value}, () => {
        this.props.loadProductsSearch!(0, 20, this.state.searchText)
     })
    }

  }

  notify = () => {
    toast.success(this.props.translate!('common.featureImplementLater'), {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: '#ff3366'
      }),
    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes } = this.props
    const { value } = this.state
    const availableSizes = ['All', 'XL', 'L', 'M', 'S', 'XS']
    const availableBrands = [
      'Cheap Monday',
      'ASOS',
      'Adidas Original',
      'Abercrombie & Fitch',
      'ASOS'
    ]
    const availableColors = [
      '#000000',
      '#ffffff',
      '#e2e2e2',
      '#ff3366',
      '#228B22',
      '#2E8B57'
    ]
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
    const productList = this.productLoad()

    return (
      <React.Fragment>
        <Card style={{ margin: 10 }}>
          <CardContent className={classes.root}>
            <Typography
              variant='subtitle1'
              style={{ padding: 10, alignSelf: 'center' }}
            >
              Filter
            </Typography>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel className={classes.filterlabel}
                ref={ref => {
                  // this.InputLabelRef = ref
                }}
                htmlFor='outlined-age-native-simple'
              >
                Gender
              </InputLabel>
              <Select
                native
                value={this.state.gender}
                onChange={this.handleChangeGender('age')}
                input={
                  <OutlinedInput
                    name='age'
                    labelWidth={this.state.labelWidth}
                    id='outlined-age-native-simple'
                  />
                }
              >
                <option value='' />
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </Select>
            </FormControl>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  // this.InputLabelRef = ref
                }}
                htmlFor='outlined-age-native-simple'
              >
                Casual
              </InputLabel>
              <Select
                native
                value={this.state.casual}
                onChange={this.handleChangeCasual('age')}
                input={
                  <OutlinedInput
                    name='age'
                    labelWidth={this.state.labelWidth}
                    id='outlined-age-native-simple'
                  />
                }
              >
                <option value='' />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  // this.InputLabelRef = ref
                }}
                htmlFor='outlined-age-native-simple'
              >
                Color
              </InputLabel>
              <Select
                native
                value={this.state.color}
                onChange={this.handleChangeColor('age')}
                input={
                  <OutlinedInput
                    name='age'
                    labelWidth={this.state.labelWidth}
                    id='outlined-age-native-simple'
                  />
                }
              >
                <option value='' />
                <option value={1}>Red</option>
                <option value={2}>Green</option>
                <option value={3}>Yellow</option>
                <option value={4}>Black</option>
                <option value={5}>Gray</option>
                <option value={6}>Blue</option>
              </Select>
            </FormControl>

            <Typography
              variant='subtitle1'
              style={{ padding: 10, alignSelf: 'center' }}
            >
              Sort
            </Typography>

            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  // this.InputLabelRef = ref
                }}
                htmlFor='outlined-age-native-simple'
              >
                Sort by
              </InputLabel>
              <Select
                native
                value={this.state.sort}
                onChange={this.handleChangeColor('age')}
                input={
                  <OutlinedInput
                    name='age'
                    labelWidth={this.state.labelWidth}
                    id='outlined-age-native-simple'
                  />
                }
              >
                <option value='' />
                <option value={1}>Most Relevant</option>
                <option value={2}>Less Relevant</option>
                <option value={3}>From High to Low</option>
                <option value={4}>From Low to high</option>
              </Select>
            </FormControl>

            <FormControl variant='outlined' className={classes.formControl}>
            <TextField
                variant='outlined'
                id='email-input'
                onChange={this.handleInputChange}
                name='emailInput'
                label={'Search...'}

              />
          </FormControl>

          </CardContent>
        </Card>
     <Paper elevation={1} style={{ textAlign: 'center', boxShadow: '0px 0px 0px 0px'}}>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.props.productsPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
    </Paper>
        <div className={classes.root} style={{ margin: 10 }}>
          <Grid
            xs={6}
            container
            spacing={5}
            direction='column'
            justify='flex-start'
            alignItems='center'
          >
            <Grid item>
              <Paper className={classes.paper}>
                <Typography variant='subtitle1' color='textSecondary'>
                  Color
                </Typography>
                {availableColors.map(x => (
                  <div key={x} style={styles(x, '')} />
                ))}

                <Typography variant='subtitle1' color='textSecondary'>
                  Size
                </Typography>
                {availableSizes.map(x => (
                  <Button color='secondary' key={x}>
                    {x}
                  </Button>
                ))}

                <Typography variant='subtitle1' color='textSecondary'>
                  Price Range
                </Typography>
                <Slider
                  classes={{ container: classes.slider }}
                  value={value}
                  min={0}
                  max={6}
                  step={1}
                  onChange={this.handleChange}
                />

                <Typography variant='subtitle1' color='textSecondary'>
                  Brand
                </Typography>
                {availableBrands.map(x => (
                  <FormGroup key={x} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedA}
                          onChange={this.handleChangeCheckedBrand('checkedA')}
                          value='checkedA'
                          key={x}
                        />
                      }
                      label={x}
                    />
                  </FormGroup>
                ))}

                <Divider />

                <Grid container>
                  <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    direction='row'
                    justify='center'
                    alignItems='center'
                  >
                    <FormButton
                      className={classes.button}
                      align='center'
                      color='secondary'
                      onClick={this.notify}
                    >
                      {'Apply'}
                    </FormButton>
                  </Grid>
                  <ToastContainer autoClose={2000}/>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                  >
                    <Typography variant='subtitle1' color='error' align='right'>
                      Clear All
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
          >
            {productList}
          </Grid>
        </div>
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
const mapDispatchToProps = (dispatch: any, ownProps: IProductsComponentProps) => {
  const { productsCategoryId } = ownProps.match.params
  return {
    loadProductsStream: (page: number, limit: number) => {
      if (productsCategoryId) {
        dispatch(productActions.dbGetProductsByCategory(page, limit, productsCategoryId))
      } else {
        dispatch(productActions.dbClearAllCategoryProductList())
        dispatch(productActions.dbGetProducts(page, limit))
      }

  },
    loadProductsSearch: (page: number, limit: number, searchText: string) => {
      dispatch(productActions.dbGetProductsBySearchText(page, limit, searchText))
    },
    loadData: () => {
      if (productsCategoryId) {
        dispatch(productActions.dbGetProductsByCategory(1, 10, productsCategoryId))
      } else {
        dispatch(productActions.dbClearAllCategoryProductList())
        dispatch(productActions.dbGetProducts())
      }

    },
    clearSearchList: () => (dispatch(productActions.dbClearAllSearchList())),
    openEditor: () => dispatch(userActions.openEditProfile())
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (
  state: Map<string, any>,
  ownProps: IProductsComponentProps
) => {
  let mergedProducts = Map({})
  const products = state.getIn(['products', 'userProducts'])
  mergedProducts = mergedProducts.merge(products)

  let mergedProductsBySearchText = Map({})
  const productsBySearchText = state.getIn([
    'products',
    'userProductsBySearchText'
  ])

  mergedProductsBySearchText = mergedProductsBySearchText.merge(
    productsBySearchText
  )

  if ( mergedProductsBySearchText.keySeq().count() > 0 ) {
    mergedProducts = mergedProductsBySearchText
  }
  let mergedProductsByCategory = Map({})
  const productsByCategory = state.getIn(['products', 'userProductsByCategory'])
  mergedProductsByCategory = mergedProductsByCategory.merge(productsByCategory)
  if ( mergedProductsByCategory.keySeq().count() > 0 ) {
    mergedProducts = mergedProductsByCategory
  }

  const productsPageCount = state.getIn(['products', 'productsPageCount'])

  const editProfileOpen = state.getIn(['user', 'openEditProfile'])
  return {
    mergedProducts,
    mergedProductsBySearchText,
    mergedProductsByCategory,
    productsPageCount,
    editProfileOpen
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
