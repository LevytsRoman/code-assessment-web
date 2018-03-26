import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title }) => (
  <div className="info">
    <div className="heading">
      <h3 className="tittle">{title}</h3>
      <div className="price">&#36;{price}</div>
    </div>
    <div className="inventory">
      {inventory ? `${inventory} remaining` : 'out of stock'}
    </div>
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string
}

export default Product
