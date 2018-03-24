import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const Cart  = ({ products, total, onCheckoutClicked, onRemoveClicked, onAddClicked, onMinusClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <div key={product.id}>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
        />
        <button className="remove" onClick={() => onRemoveClicked(product.id)}>remove</button>
        <button onClick={() => onMinusClicked(product.id)}>-</button>
        {product.quantity}
        <button onClick={() => onAddClicked(product.id)}>+</button>
      </div>
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}
        className="checkout">
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  addToCart: PropTypes.func,
  onMinusClicked: PropTypes.func  
}

export default Cart
