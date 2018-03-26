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
        imgUrl: item.productTitle.toLowerCase()
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
export const toggleCart = () => (dispatch, getState) => {
  const { ui } = getState()
  const scroll = ui.cartOpen ? "auto" :  "hidden"

  // I really dislike hiding scroll here, but restructuring the app would take too much time
  document.body.style.overflow = scroll;
  
  dispatch({type: types.TOGGLE_CART})
}
export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })

  toggleCart()(dispatch);
  
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

const decreaseQuantityByOneUnsafe = productId => ({
  type: types.DECREASE_QUANTITY_BY_ONE,
  productId
})

export const decreaseQuantityByOne = productId => (dispatch, getState) => {
  let {cart} = getState();

  if (cart.quantityById[productId] > 1) {
    dispatch(decreaseQuantityByOneUnsafe(productId));
  }
}