import ui from './ui'

describe('reducers', () => {
  describe('ui', () => {
    it('should switch openCart to true when it is false', () => {
      expect(ui({cartOpen: false}, {type: 'TOGGLE_CART'})).toEqual({cartOpen: true})
    })

    it('should switch openCart to false when it is true', () => {
      expect(ui({cartOpen: true}, {type: 'TOGGLE_CART'})).toEqual({cartOpen: false})
    })
  })
})
