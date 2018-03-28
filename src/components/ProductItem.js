import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div className="product--item--wrapper">
    <img 
      src={`./images/${product.imgUrl}.jpg`} 
      alt="cart logo" 
      className="item--image" />
    <div className="item--info">
      <Product
        title={product.title}
        price={product.price}
        inventory={product.inventory} />
      <button
        onClick={onAddToCartClicked}
        disabled={product.inventory > 0 ? '' : 'disabled'}
        className="button--primary hoverable"
        >
        {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
      </button>
    </div>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
