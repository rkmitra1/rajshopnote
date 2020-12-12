import { render } from '@redwoodjs/testing'

import ShopNoteDisplay from './ShopNoteDisplay'

describe('ShopNoteDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShopNoteDisplay />)
    }).not.toThrow()
  })
})
