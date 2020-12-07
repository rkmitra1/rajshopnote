import { Link, routes } from '@redwoodjs/router'

import ShopNotes from 'src/components/ShopNotes'

export const QUERY = gql`
  query SHOP_NOTES {
    shopNotes {
      id
      name
      description
      updatedAt
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
  return <ShopNotes shopNotes={shopNotes} />
}
