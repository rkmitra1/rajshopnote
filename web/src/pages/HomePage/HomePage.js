import { Link, routes } from '@redwoodjs/router'
import ShopNotesCell from 'src/components/ShopNotesCell'

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <div className="container mx-auto p-8">
        <div className="flex flex-none">
          <ShopNotesCell />
        </div>
      </div>
    </>
  )
}

export default HomePage
