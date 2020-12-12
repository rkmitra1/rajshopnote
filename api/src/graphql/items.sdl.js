export const schema = gql`
  type Item {
    id: Int!
    name: String!
    urgent: Boolean!
    checked: Boolean!
    note: ShopNote
    noteId: Int
  }

  type Query {
    items: [Item!]!
    item(id: Int!): Item
  }

  input CreateItemInput {
    name: String!
    urgent: Boolean!
    checked: Boolean!
    noteId: Int
  }

  input UpdateItemInput {
    name: String
    urgent: Boolean
    checked: Boolean
    noteId: Int
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item!
    updateItem(id: Int!, input: UpdateItemInput!): Item!
    deleteItem(id: Int!): Item!
    updateItemUrgent(id: Int!, urgent: Boolean!): Item
    updateItemChecked(id: Int!, checked: Boolean!): Item
    updateItemName(id: Int!, name: String!): Item
  }
`
