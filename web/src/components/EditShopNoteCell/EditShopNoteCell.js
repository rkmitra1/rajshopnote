import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ShopNoteForm from 'src/components/ShopNoteForm'

export const QUERY = gql`
  query FIND_SHOP_NOTE_BY_ID($id: Int!) {
    shopNote: shopNote(id: $id) {
      id
      name
      description
      updatedAt
    }
  }
`
const UPDATE_SHOP_NOTE_MUTATION = gql`
  mutation UpdateShopNoteMutation($id: Int!, $input: UpdateShopNoteInput!) {
    updateShopNote(id: $id, input: $input) {
      id
      name
      description
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ shopNote }) => {
  const { addMessage } = useFlash()
  const [updateShopNote, { loading, error }] = useMutation(
    UPDATE_SHOP_NOTE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.shopNotes())
        addMessage('ShopNote updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateShopNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ShopNote {shopNote.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ShopNoteForm
          shopNote={shopNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
