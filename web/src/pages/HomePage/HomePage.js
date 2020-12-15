import { Link, routes } from '@redwoodjs/router'
import ShopNotesLayout from 'src/layouts/ShopNotesLayout'
import ShopNotesCell from 'src/components/ShopNotesCell'

const HomePage = () => {
  return (
    <ShopNotesLayout>
      <div className="container mx-auto p-2">
        <div className="flex flex-wrap">
          <ShopNotesCell />
        </div>
      </div>
    </ShopNotesLayout>
  )
}

export default HomePage
