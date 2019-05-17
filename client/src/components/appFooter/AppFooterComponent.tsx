// - Import react components
import 'react-toastify/dist/ReactToastify.css'

import { connect } from 'react-redux'
import { css } from 'glamor'
import { getTranslate } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import React, { Component } from 'react'

import LayoutBody from 'src/components/layoutBody'
import Typography from 'src/components/typography'

import { IAppFooterComponentProps } from './IAppFooterComponentProps'
import { IAppFooterComponentState } from './IAppFooterComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  layoutBody: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  iconsWrapper: {
    height: 120
  },
  icons: {
    display: 'flex'
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    },
  },
  title: {
    fontSize: 16,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    },
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontSize: 16,
    color: '#6c6c6c',
    lineHeight: '150%'
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150
  }
})

/**
 * Create component class
 */
export class AppFooterComponent extends Component<
  IAppFooterComponentProps,
  IAppFooterComponentState
> {
  static propTypes = {
    /**
     * List of users
     */
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IAppFooterComponentProps) {
    super(props)

    // Defaul state
    this.state = {}

    // Binding functions to `this`
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
    const { classes, goTo } = this.props

    return (
      <Typography component='footer' className={classes.root}>
        <LayoutBody className={classes.layoutBody} width='large'>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12} md={3}>
              <Typography variant='h6' className={classes.title} gutterBottom>
                QUESTIONS?
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link onClick={this.notify}>Help</Link>
                </li>
                <li className={classes.listItem}>
                  <Link onClick={this.notify}>Track Order</Link>
                </li>
                <li className={classes.listItem}>
                  <Link onClick={this.notify}>Returns</Link>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Typography variant='h6' className={classes.title} gutterBottom>
                WHAT'S IN STORE
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link
                    onClick={(evt: any) => {
                    evt.preventDefault()
                    goTo!(`/productsbycat1/1`)
                  }}
                  >
                    {'French'}
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link
                    onClick={(evt: any) => {
                    evt.preventDefault()
                    goTo!(`/productsbycat2/2`)
                  }}
                  >
                    {'Italian'}
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link
                    onClick={(evt: any) => {
                    evt.preventDefault()
                    goTo!(`/productsbycat3/4`)
                  }}
                  >
                    {'Animal'}
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link
                    onClick={(evt: any) => {
                    evt.preventDefault()
                    goTo!(`/productsbycat4/5`)
                  }}
                  >
                    {'Flower'}
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link
                    onClick={(evt: any) => {
                    evt.preventDefault()
                    goTo!(`/productsbycat5/6`)
                      }}
                  >
                    {'Christmas'}
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Typography variant='h6' className={classes.title} gutterBottom>
                FOLLOW US
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link onClick={this.notify}>Facebook</Link>
                </li>
                <li className={classes.listItem}>
                  <Link onClick={this.notify}>Twitter</Link>
                </li>
                <li className={classes.listItem}>
                  <Link onClick={this.notify}>YouTube</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <ul className={classes.list}>
                <li>
                  <Link onClick={(evt: any) => {evt.preventDefault()}}>©2019 shopmate Ltd</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </LayoutBody>
      </Typography>
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
  ownProps: IAppFooterComponentProps
) => {
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
const mapStateToProps = (state: any, ownProps: IAppFooterComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid,
    translate: getTranslate(state.get('locale')),
  }
}

export default withRouter<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles as any, { withTheme: true })(
    AppFooterComponent as any
  ) as any)
) as typeof AppFooterComponent
