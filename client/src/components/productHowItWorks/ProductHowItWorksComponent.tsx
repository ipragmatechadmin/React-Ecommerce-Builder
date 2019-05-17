// - Import react components
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import classNames from 'classnames'

import LayoutBody from 'src/components/layoutBody'
import Typography from 'src/components/typography'

import { IProductHowItWorksComponentProps } from './IProductHowItWorksComponentProps'
import { IProductHowItWorksComponentState } from './IProductHowItWorksComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    backgroundColor: '#f7f7f7',
    overflow: 'hidden',
    padding: '35px',
    [theme.breakpoints.down('xs')]: {
      padding: '20px'
    }
  },
  layoutBody: {
    position: 'relative',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: '20px'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  itemimage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0)
    },
  },
  productwrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center'
    },
  },
  productitem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(5, 5, 0, 0),
    [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
        padding: theme.spacing(0),
    },
  },
  productimages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'Pointer'
  },
  productimagesleft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'Pointer',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${15}px ${45}px`,
    boxShadow: 'none'
  },
  paperroot: {
    width: '100%',
    marginTop: 16
  },
  producttitle: {
    fontSize: 24,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'inherit',
    fontWeight: 'bold',
    marginBottom: '2rem'
  },
  productcontent: {
    fontSize: 16,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'inherit',
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        padding: '5px'
    },
  },
  sectionimage: {
    marginTop: 15
  },
  card: {
    width: '100%',
    boxShadow: 'none',
    borderRadius: 0,
  },
  cardleft: {
    width: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      width: '49.5%',
    },
    [theme.breakpoints.only('md')]: {
      width: '49.5%',
    }
  },
  cardImage: {
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      marginRight: '1rem'
    },
    [theme.breakpoints.only('md')]: {
      marginBottom: 0,
      marginRight: '1rem'
    }
  },
  leftMedia: {
    height: 0,
    paddingTop: '93.8%', // 16:9
  },
  media: {
    height: 0,
    paddingTop: '59.8%', // 16:9
    backgroundPosition: 'top center'
  },
  sideproducttitle: {
    fontSize: 60,
    fontFamily: '"Playfair Display", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'inherit',
    letterSpacing: '3px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 30
    }
  },
  sideproductcontent: {
    fontSize: 24,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'inherit',
    marginBottom: '2rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12
    }
  },
  registerbutton: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${17}px ${80}px`,
    boxShadow: 'none'
  },
  registerbuttonwrapper: {
    marginBottom: '2.3rem'
  }
})

/**
 * Create component class
 */
export class ProductHowItWorksComponent extends Component<IProductHowItWorksComponentProps,IProductHowItWorksComponentState> {

  static propTypes = {
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IProductHowItWorksComponentProps) {
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
    const { classes, goTo } = this.props
    return (
      <section className={classes.root}>
        <LayoutBody className={classes.layoutBody} width='full'>
          <Paper className={classes.paperroot} elevation={1}>
            <Grid container spacing={4}>
              <Grid item sm={12} md={6} xs={12} className={classes.productwrapper} >
                <div className={classes.itemimage}>
                <Hidden xsDown implementation='css'>
                    <img src={'/public/bag-big.png'}/>
                </Hidden>
                <Hidden smUp implementation='css'>
                    <img src={'/public/bag-small.png'}/>
                </Hidden>
                </div>
              </Grid>
              <Grid item sm={12} md={6} xs={12} className={classes.productwrapper} >
                <div className={classes.productitem}>
                  <Typography variant='h1' className={classes.producttitle}>
                    Vera Bradley
                  </Typography>
                  <Typography variant='body1' className={classes.productcontent} >
                    Carry the day in style with this extra-large tote crafted in our chic B.B. Colloction textured PVC. Featuring colorful faux leather trim, this tote offers a roomy interior plus just engough perfectly placed.
                  </Typography>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/products`)
                    }}
                  >
                     Shop Now
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </LayoutBody>

        <LayoutBody className={classes.layoutBody} width='full'>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={4} >
              <div className={classes.productimagesleft}>
                <Card className={classNames(classes.cardleft,classes.cardImage)}>
                    <CardMedia
                      className={classes.leftMedia}
                      image={require('src/styles/images/wow.png')}
                      title='Wow'
                    />
                </Card>
                <Card className={classes.cardleft}>
                  <CardMedia
                    className={classes.leftMedia}
                    image={require('src/styles/images/men-size-full.png')}
                    title='Men Clothings'
                  />
                </Card>
              </div>
              </Grid>
              <Grid item xs={12} lg={8}>
                <div className={classes.productimages}>
                  <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={require('src/styles/images/sidemainfull.png')}
                        title='Paella dish'
                      />
                      <CardContent>
                      <Typography variant='h6' align='center' className={classes.sideproducttitle}>
                        Let the Game begin
                      </Typography>
                      <Typography component='p' align='center' className={classes.sideproductcontent}>
                        Registration is on - get ready for the Open
                      </Typography>
                      <Typography component='p' align='center' className={classes.registerbuttonwrapper}>
                        <Button
                          variant='contained'
                          color='secondary'
                          className={classes.registerbutton}
                          onClick={(evt: any) => {
                            evt.preventDefault()
                            goTo!('/signup')
                          }}
                        >
                           Register
                        </Button>
                      </Typography>
                      </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IProductHowItWorksComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IProductHowItWorksComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(ProductHowItWorksComponent as any) as any)) as typeof ProductHowItWorksComponent
