// Define your own mock data here:
import { standard as standarditem } from '../ItemCell/ItemCell.mock'

export const standard = (/* vars, { ctx, req } */) => ({
  shopnote: {
    id: 1,
    name: 'mock post',
    description: 'description in mock post',
    updatedAt: Date.now(),
    items: [
      {
        id: 2,
        name: 'mock post',
        urgent: false,
        checked: false,
      },
      {
        id: 3,
        name: 'mock post two',
        urgent: false,
        checked: false,
      },
    ],
  },
})
