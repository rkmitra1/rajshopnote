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
    <div className="container mx-auto p-8">
      <div className="flex flex-wrap overflow-hidden">
        <div className="w-1/4 overflow-hidden bg-blue-500 rounded-xl">
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <a className="no-underline hover:underline text-black" href="#">
                {shopnote.name}
              </a>
            </h1>
            <p className="text-grey-darker text-sm">
              {shopnote.updatedAt.match(/(.*)T/)[1]}
            </p>
          </header>
          {shopnote.description}
        </div>
      </div>
    </div>
  ))
}

{
  /* <Card bg="dark" text="white" className="mb-2">
<Card.Body>
  <Card.Title>
    <span className="note-header-icon">
      <ShoppingBag />
    </span>
    { shopnote.name }
    <span className="note-header-cancel">
      <X onClick={() => props.deleteNote(shopnote["_id"])}/>
    </span>

  </Card.Title>
  <Card.Text>{ shopnote.description }</Card.Text>
  <ul className="item-container">
    {items &&
      items.map((item, index) => (
        <Item
          data={item}
          key= {generate()}
          toggle={update}
          rename={renameItem}
          addItem={addItem}
          deleteItem={deleteItem}
          saveItem={saveItem}
          cancelSave={cancelSave}
        />
      ))}
  </ul>
</Card.Body>

{
  shopnote.updatedAt &&

  <Card.Footer>
    <small className="text-muted">Created At: { moment(shopnote.updatedAt).format('YYYY-MM-DD h:mm:ss a') }</small>
  </Card.Footer>
}

</Card> */
}
