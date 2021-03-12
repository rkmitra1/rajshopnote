import ShopNoteItemDisplay from './ShopNoteItemDisplay'
import { standard } from '../ItemCell/ItemCell.mock'

export const generated = () => {
  return <ShopNoteItemDisplay {...standard()} />
}

export default { title: 'Components/ShopNoteItemDisplay' }
