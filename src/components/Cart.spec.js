import React from 'react'
import { shallow } from 'enzyme'
import Cart from './Cart'
import Product from './Product'

const setup = (total, products = []) => {
  const actions = {
    onCheckoutClicked: jest.fn()
  }
  const component = shallow(
    <Cart products={products} total={total} {...actions} />
  )

  // console.log(component.find('.subtotal').debug())
  // console.log(component.debug());
  
  return {
    component: component,
    actions: actions,
    button: component.find('button'),
    products: component.find(Product),
    em: component.find('em'),
    total: component.find('.subtotal')
  }
}

describe('Cart component', () => {
  it('should display total', () => {
    const { total } = setup('76', [
      {
        id: 1,
        title: 'Product 1',
        price: 9.99,
        quantity: 1
      }
    ])

    expect(total.text()).toMatch(/^\$76/)
  })

  it('should display add some products message', () => {
    const { em } = setup()
    expect(em.text()).toMatch(/^Please add some products to your cart/)
  })

  describe('when given product', () => {
    const product = [
      {
        id: 1,
        title: 'Product 1',
        price: 9.99,
        quantity: 1
      }
    ]

    it('should render products', () => {
      const { products } = setup('9.99', product)
      const props = {
        title: product[0].title,
        price: product[0].price,
        quantity: product[0].quantity
      }

      expect(products.at(0).props()).toEqual(props)
    })

    it('should not disable button', () => {
      const { button } = setup('9.99', product)
      // console.log(button.find('.checkout'));

      expect(button.find('.checkout').prop('disabled')).toEqual('')
    })

    it('should call action on button click', () => {
      const { button, actions } = setup('9.99', product)
      button.find('.checkout').simulate('click')
      
      expect(actions.onCheckoutClicked).toBeCalled()
    })
  })
})
