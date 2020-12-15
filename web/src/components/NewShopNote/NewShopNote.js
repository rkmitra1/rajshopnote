import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ShopNoteForm from 'src/components/ShopNoteForm'

import { QUERY } from 'src/components/ShopNotesCell'

const CREATE_SHOP_NOTE_MUTATION = gql`
  mutation CreateShopNoteMutation($input: CreateShopNoteInput!) {
    createShopNote(input: $input) {
      id
    }
  }
`

const NewShopNote = () => {
  const { addMessage } = useFlash()
  const [createShopNote, { loading, error }] = useMutation(
    CREATE_SHOP_NOTE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.home())
        addMessage('ShopNote created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createShopNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ShopNote</h2>
      </header>
      <div className="rw-segment-main">
        <ShopNoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewShopNote
