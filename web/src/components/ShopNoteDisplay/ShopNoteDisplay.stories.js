import ShopNoteDisplay from './ShopNoteDisplay'
import { standard } from '../ShopNoteCell/ShopNoteCell.mock'

export const generated = () => {
  return <ShopNoteDisplay {...standard()} />
}

export default { title: 'Components/ShopNoteDisplay' }
