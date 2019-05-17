// - Import react components
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

import AppNewsletter from 'components/newsLetter'
import ProductHero from 'components/productHero'
import ProductHowItWorks from 'components/productHowItWorks'

import { IHomeSectionsComponentProps } from './IHomeSectionsComponentProps'
import { IHomeSectionsComponentState } from './IHomeSectionsComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({

})

/**
 * Create component class
 */
export class HomeSectionsComponent extends Component<IHomeSectionsComponentProps,IHomeSectionsComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IHomeSectionsComponentProps) {
    super(props)
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    return (
      <React.Fragment>
        <ProductHero />
        <ProductHowItWorks />
        <AppNewsletter />
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
const mapDispatchToProps = (dispatch: Function, ownProps: IHomeSectionsComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IHomeSectionsComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(HomeSectionsComponent as any) as any)) as typeof HomeSectionsComponent
