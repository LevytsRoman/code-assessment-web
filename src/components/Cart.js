import React from 'react'
import PropTypes from 'prop-types'

import Product from './Product'
import CloseIcon from './SvgIcons/CloseIcon'
import CartIcon from './SvgIcons/CartIcon'

const Cart  = ({ products, total, onCheckoutClicked, onRemoveClicked, onAddClicked, onMinusClicked, toggleCart }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <div className="cart--product" key={product.id}>
        <div className="cart--product--info">
          <img 
            className="cart--image" 
            src={`./images/${product.imgUrl}.jpg`} 
            alt="empty cart" />
          <div className="cart--info--stuff">
            <Product
              title={product.title}
              price={product.price}
              quantity={product.quantity}
            />
            <button 
              className="hoverable remove" 
              onClick={() => onRemoveClicked(product.id)} >
              remove
            </button>
          </div>
        </div>

        <div className="cart--item--control">
          <div className="plus--minus">
            <button 
              className="button--secondary minus hoverable" 
              onClick={() => onMinusClicked(product.id)}
              disabled={product.quantity === 1 ? "disabled" : ""} >
              -
            </button>
            <div className="quantity">{product.quantity}</div>
            <button 
              className="button--secondary plus hoverable" 
              onClick={() => onAddClicked(product.id)}
              disabled={product.inventory ? "" : "disabled"} >
              +
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="empty--cart">
        <CartIcon/>
        <div className="empty--cart--text"><em>Please add some products to your cart.</em></div>
    </div>
  )

  const roundForTaxes = (taxRate) => {
    let roundedNum = (Math.round(total * taxRate * 100)/100).toString();

    const roundedArr = roundedNum.toString().split('.')
    if (roundedArr[roundedArr.length-1].length === 1) {
      roundedNum += '0';
    } else if(roundedArr.length === 1) {
      roundedNum += '.00';
    } 

    return roundedNum;
  }

  return (
    <div className="cart--container">
      <div className="cart">
        <div>
          <h3 className="cart--title">Your Cart</h3>
          <hr/>
          <CloseIcon toggleCart={toggleCart}/>
        </div>
        <div className="cart--body">{nodes}</div>
        
        {hasProducts ? (
          <div className="total--price">
            <hr/>
            <div className="cart--price--info first--row">
              <div className="category">Subtotal: </div>
              <div className="cart--price--stuff">&#36;{total}</div>
            </div>
            <div className="cart--price--info">
              <div className="category">Taxes: </div>
              <div className="cart--price--stuff">&#36;{roundForTaxes(.08)}</div>
            </div>
            <hr/>
            <div className="cart--price--info">
              <div className="category">Total: </div>
              <div className="cart--price--stuff">
                &#36;{roundForTaxes(1.08)}
              </div>
            </div>          
            <button 
              onClick={onCheckoutClicked}
              disabled={hasProducts ? '' : 'disabled'}
              className="button--primary checkout hoverable" >
              Checkout
            </button>
          </div>) : null}
      </div>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  addToCart: PropTypes.func,
  onMinusClicked: PropTypes.func,
  toggleCart: PropTypes.func
}

export default Cart
