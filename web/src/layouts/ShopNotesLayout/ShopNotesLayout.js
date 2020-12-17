import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const ShopNotesLayout = (props) => {
  return (
    <div className="Xrw-scaffold">
      <Flash timeout={1000} />
      <header className="flex justify-between items-center py-4 px-8 bg-primary text-white">
        <h1 className="">
          <Link to={routes.home()} className="text-white">
            ShopNotes
          </Link>
        </h1>
        <Link
          to={routes.newShopNote()}
          className="border-white border bg-secondary rounded-lg px-1"
        >
          + ShopNote
        </Link>
      </header>
      <main className="">{props.children}</main>
    </div>
  )
}

export default ShopNotesLayout
