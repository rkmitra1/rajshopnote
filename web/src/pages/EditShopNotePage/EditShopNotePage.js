import ShopNotesLayout from 'src/layouts/ShopNotesLayout'
import EditShopNoteCell from 'src/components/EditShopNoteCell'

const EditShopNotePage = ({ id }) => {
  return (
    <ShopNotesLayout>
      <EditShopNoteCell id={id} />
    </ShopNotesLayout>
  )
}

export default EditShopNotePage
