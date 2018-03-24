import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import axios from 'axios'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

export const getAllProducts = () => dispatch => {
  return axios.get('http://tech.work.co/shopping-cart/products.json')
    .then( res => {
      const products = res.data.map( item => ({ 
        ...item, 
        title: item.productTitle,
        price: item.price.value,
      }));

      dispatch(receiveProducts(products))
    })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}

const removeFromCartUnsafe = (productId, newInventory) => ({
  type: types.REMOVE_FROM_CART,
  productId,
  newInventory
})

export const removeItemFromCart = productId => (dispatch, getState) => {
  const {cart, products} = getState();
  
  if (cart.addedIds.includes(productId)) {
    const newAmount = cart.quantityById[productId] + products.byId[productId].inventory

    dispatch(removeFromCartUnsafe(productId, newAmount));
  
  }
}
