import { TOGGLE_CART } from '../constants/ActionTypes'

const initialState = {
  cartOpen: false
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return {...state, cartOpen: !state.cartOpen}
    default:
      return state
  }
}

export default ui