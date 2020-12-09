import { Link, routes } from '@redwoodjs/router'

import ShopNotes from 'src/components/ShopNotes'

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
  return shopNotes.map((shopnote) => (
    <div className="w-1/2 m-4 p-4 pt-2 bg-blue-500 rounded-xl border-gray-500 border-2 shadow-md">
      <header className="flex justify-between">
        <h1 className="text-lg">
          <a className="no-underline hover:underline text-black" href="#">
            {shopnote.name}
          </a>
        </h1>
        <p className="text-grey-darker text-sm">
          {shopnote.updatedAt.match(/(.*)T/)[1]}
        </p>
      </header>
      <hr className="mt-1 mb-3" />
      <div className="text-sm">{shopnote.description}</div>

      {shopnote.items.map((item) => (
        <div className="text-sm">
          <input
            type="checkbox"
            className=""
            // onChange={() => props.toggle(item['_id'], 'checked')}
            defaultChecked={item.checked || false}
          />
          <span
            className={`w-4 h-4 mx-2 rounded-lg ${
              item.urgent ? 'urgent' : 'normal'
            }`}
            onClick={() => props.toggle(item['_id'], 'urgent')}
          ></span>
          {item.name}
        </div>
      ))}
    </div>
  ))
}
