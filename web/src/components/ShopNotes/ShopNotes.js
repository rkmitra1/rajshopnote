import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/ShopNotesCell'

const DELETE_SHOP_NOTE_MUTATION = gql`
  mutation DeleteShopNoteMutation($id: Int!) {
    deleteShopNote(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const ShopNotesList = ({ shopNotes }) => {
  const { addMessage } = useFlash()
  const [deleteShopNote] = useMutation(DELETE_SHOP_NOTE_MUTATION, {
    onCompleted: () => {
      addMessage('ShopNote deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete shopNote ' + id + '?')) {
      deleteShopNote({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {shopNotes.map((shopNote) => (
            <tr key={shopNote.id}>
              <td>{truncate(shopNote.id)}</td>
              <td>{truncate(shopNote.name)}</td>
              <td>{truncate(shopNote.description)}</td>
              <td>{timeTag(shopNote.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.shopNote({ id: shopNote.id })}
                    title={'Show shopNote ' + shopNote.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editShopNote({ id: shopNote.id })}
                    title={'Edit shopNote ' + shopNote.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete shopNote ' + shopNote.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(shopNote.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShopNotesList
