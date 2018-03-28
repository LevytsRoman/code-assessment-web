import React from 'react'
import { shallow } from 'enzyme'
import Product from './Product'

const setup = props => {
  const component = shallow(
    <Product {...props} />
  )

  return {
    title: component.find('.title'),
    price: component.find('.price'),
    inventory: component.find('.inventory')  
  }
}

describe('Product component', () => {
  it('should render title', () => {
    const { title } = setup({ title: 'Test Product', price: 9.99 })
    expect(title.text()).toBe('Test Product')
  })

  it('should render price', () => {
    const { price } = setup({ title: 'Test Product', price: 9.99 })
    expect(price.text()).toBe('$9.99')
  })

  describe('when given inventory', () => {
    it('should render inventory', () => {
      const { inventory } = setup({ title: 'Test Product', price: 9.99, inventory: 6 })
      expect(inventory.text()).toBe('6 remaining')
    })
  })
})
