import { render } from '@redwoodjs/testing'

import ShopNoteItemDisplay from './ShopNoteItemDisplay'

describe('ShopNoteItemDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShopNoteItemDisplay />)
    }).not.toThrow()
  })
})
