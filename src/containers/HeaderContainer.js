import React from 'react'
import {bool, func, number} from 'prop-types'
import { connect } from 'react-redux'
import { toggleCart } from '../actions'
import { getCartProductCount } from '../reducers'
import CartContainer from './CartContainer'

const HeaderContainer = ({cartOpen, itemsInCart, toggleCart}) => (
  <div>
    <header>
      <h2 className="store--tittle">Acme Store</h2>
      <a className="cart--opener hoverable" onClick={toggleCart}><div className="small--cart"/>{itemsInCart ? `(${itemsInCart})` : "Your cart is empty"}</a>
    </header>
    {cartOpen ? <CartContainer/> : null}
  </div>
)

HeaderContainer.propTypes = {
  cartOpen: bool.isRequired,
  itemsInCart: number.isRequired,  
  toggleCart: func.isRequired
}

const mapStateToProps = (state) => ({
  itemsInCart: getCartProductCount(state),
  cartOpen: state.ui.cartOpen
})

export default connect(
  mapStateToProps,
  { toggleCart }
)(HeaderContainer)
