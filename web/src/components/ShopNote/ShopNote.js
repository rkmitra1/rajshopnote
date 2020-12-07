import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/ShopNotesCell'

const DELETE_SHOP_NOTE_MUTATION = gql`
  mutation DeleteShopNoteMutation($id: Int!) {
    deleteShopNote(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ShopNote = ({ shopNote }) => {
  const { addMessage } = useFlash()
  const [deleteShopNote] = useMutation(DELETE_SHOP_NOTE_MUTATION, {
    onCompleted: () => {
      navigate(routes.shopNotes())
      addMessage('ShopNote deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete shopNote ' + id + '?')) {
      deleteShopNote({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ShopNote {shopNote.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{shopNote.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{shopNote.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{shopNote.description}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(shopNote.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editShopNote({ id: shopNote.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(shopNote.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default ShopNote
