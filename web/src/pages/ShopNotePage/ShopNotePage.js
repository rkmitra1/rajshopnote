import ShopNotesLayout from 'src/layouts/ShopNotesLayout'
import ShopNoteCell from 'src/components/ShopNoteCell'

const ShopNotePage = ({ id }) => {
  return (
    <ShopNotesLayout>
      <div className="container mx-auto p-8">
        <div className="grid grid-flow-col auto-cols-max">
          <ShopNoteCell id={id} />
        </div>
      </div>
    </ShopNotesLayout>
  )
}

export default ShopNotePage
