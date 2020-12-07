export const schema = gql`
  type ShopNote {
    id: Int!
    name: String!
    description: String!
    updatedAt: DateTime!
    items: [Item]!
  }

  type Query {
    shopNotes: [ShopNote!]!
    shopNote(id: Int!): ShopNote
  }

  input CreateShopNoteInput {
    name: String!
    description: String!
  }

  input UpdateShopNoteInput {
    name: String
    description: String
  }

  type Mutation {
    createShopNote(input: CreateShopNoteInput!): ShopNote!
    updateShopNote(id: Int!, input: UpdateShopNoteInput!): ShopNote!
    deleteShopNote(id: Int!): ShopNote!
  }
`
