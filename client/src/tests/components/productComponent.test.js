import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import createHistory from 'history/createBrowserHistory'
import { rootReducer } from 'src/store/reducers'

import ProductComponent from 'src/components/product/ProductComponent';
import { Map, fromJS } from 'immutable';

// create any initial state needed
const initialState = Map({

});

const mockStore = configureMockStore();
const store = mockStore(initialState);
import '../../setupTests';

it('Renders correctly', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ProductComponent
        product={Map({
          productId: 1,
          name:
            "Arc d'Triomphe,description:This beautiful and iconic T-shirt will no doubt lead you to your own triumph",
          price: 14.99,
          discountedPrice: 0,
          image: 'arc-d-triomphe.gif',
          image2: 'arc-d-triomphe-2.gif',
          thumbnail: 'arc-d-triomphe-thumbnail.gif',
          display: 0
        })}
      />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
