import ShopNote from 'src/components/ShopNote'

export const QUERY = gql`
  query FIND_SHOP_NOTE_BY_ID($id: Int!) {
    shopNote: shopNote(id: $id) {
      id
      name
      description
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ShopNote not found</div>

export const Success = ({ shopNote }) => {
  return <ShopNote shopNote={shopNote} />
}
