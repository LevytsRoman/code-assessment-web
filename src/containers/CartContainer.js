import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout, removeItemFromCart, addToCart, decreaseQuantityByOne, toggleCart } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = ({ products, total, checkout, removeItemFromCart, addToCart, decreaseQuantityByOne, toggleCart }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)}
    onRemoveClicked={removeItemFromCart}
    onAddClicked={addToCart}
    onMinusClicked={decreaseQuantityByOne}
    toggleCart={toggleCart} />
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,  
  decreaseQuantityByOne: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout, removeItemFromCart, addToCart, decreaseQuantityByOne, toggleCart }
)(CartContainer)
