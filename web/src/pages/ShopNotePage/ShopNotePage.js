import ShopNotesLayout from 'src/layouts/ShopNotesLayout'
import ShopNoteCell from 'src/components/ShopNoteCell'

const ShopNotePage = ({ id }) => {
  return (
    <ShopNotesLayout>
      <ShopNoteCell id={id} />
    </ShopNotesLayout>
  )
}

export default ShopNotePage
