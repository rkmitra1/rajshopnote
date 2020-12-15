import { Link, routes } from '@redwoodjs/router'

import ShopNotes from 'src/components/ShopNotes'
import ShopNoteDisplay from 'src/components/ShopNoteDisplay'

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

export const QUERY = gql`
  query SHOP_NOTES {
    shopNotes {
      id
      name
      description
      updatedAt
      items {
        id
        name
        checked
        urgent
        noteId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No shopNotes yet. '}
      <Link to={routes.newShopNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ shopNotes }) => {
  return shopNotes.map((shopnote) => <ShopNoteDisplay shopnote={shopnote} />)
}
