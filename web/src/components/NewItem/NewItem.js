import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ItemForm from 'src/components/ItemForm'

import { QUERY } from 'src/components/ItemsCell'

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`

const NewItem = () => {
  const { addMessage } = useFlash()
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: () => {
      navigate(routes.items())
      addMessage('Item created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { noteId: parseInt(input.noteId) })
    createItem({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Item</h2>
      </header>
      <div className="rw-segment-main">
        <ItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewItem
