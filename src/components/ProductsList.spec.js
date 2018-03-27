import React from 'react'
import { shallow } from 'enzyme'
import ProductsList from './ProductsList'

const setup = props => {
  const component = shallow(
    <ProductsList>{props.children}</ProductsList>
  )

  return {
    component: component,
    children: component.find('div').children().at(0)
  }
}

describe('ProductsList component', () => {
  it('should render children', () => {
    const { children } = setup({ children: 'Test Children' })
    expect(children.text()).toMatch(/^Test Children$/)
  })
})
