import {Map} from 'immutable'

const getProduct = (state: Map<string, any>, userId: string, productId: string) => {
    return state.getIn(['product', 'userProducts', userId, productId])
}

export const productSelector = {
    getProduct
}
