import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

import { useMutation, useFlash } from '@redwoodjs/web'
import { QUERY } from 'src/components/ShopNotesCell'

const CREATE_SHOP_NOTE_MUTATION = gql`
  mutation CreateShopNoteMutation($input: CreateShopNoteInput!) {
    createShopNote(input: $input) {
      id
    }
  }
`

const ShopNotesLayout = (props) => {
  const [createShopNote, { loading, error }] = useMutation(
    CREATE_SHOP_NOTE_MUTATION,
    {
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onClickAddShopNote = () => {
    const newShopNote = {
      name: '',
      description: '',
    }
    createShopNote({ variables: { input: newShopNote } })
  }

  return (
    <div className="Xrw-scaffold">
      <Flash timeout={1000} />
      <header className="flex justify-between items-center py-4 px-8 bg-primary text-white">
        <h1 className="">
          <Link to={routes.home()} className="text-white">
            ShopNotes
          </Link>
        </h1>
        <span
          className="border-white border bg-secondary rounded-lg px-1"
          onClick={(e) => onClickAddShopNote(e)}
        >
          + ShopNote
        </span>
      </header>
      <main className="">{props.children}</main>
    </div>
  )
}

export default ShopNotesLayout
