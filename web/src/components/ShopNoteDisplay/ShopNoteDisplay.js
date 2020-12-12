import { useMutation, useFlash } from '@redwoodjs/web'
import React, { useState } from 'react'

const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItemMutation($id: Int!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      name
      urgent
      checked
      noteId
    }
  }
`

const UPDATE_ITEM_URGENT_MUTATION = gql`
  mutation UpdateItemUrgentMutation($id: Int!, $urgent: Boolean!) {
    updateItemUrgent(id: $id, urgent: $urgent) {
      id
      __typename
      urgent
    }
  }
`
const UPDATE_ITEM_CHECKED_MUTATION = gql`
  mutation UpdateItemCheckedMutation($id: Int!, $checked: Boolean!) {
    updateItemChecked(id: $id, checked: $checked) {
      id
      __typename
      checked
    }
  }
`

const UPDATE_ITEM_NAME_MUTATION = gql`
  mutation UpdateItemNameMutation($id: Int!, $name: String!) {
    updateItemName(id: $id, name: $name) {
      id
      __typename
      name
    }
  }
`

const ShopNoteDisplay = ({ shopnote }) => {
  return (
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
          <ItemDetail item={item} />
        </div>
      ))}
    </div>
  )
}

const ItemDetail = ({ item }) => {
  const [updateItemUrgent] = useMutation(UPDATE_ITEM_URGENT_MUTATION)
  const [updateItemChecked] = useMutation(UPDATE_ITEM_CHECKED_MUTATION)
  const [updateItemName] = useMutation(UPDATE_ITEM_NAME_MUTATION)

  const onUpdateUrgent = (id, urgent) => {
    console.log('onUpdateUrgent:', id, urgent)
    // id = 1
    // urgent = true
    updateItemUrgent({ variables: { id, urgent } })
  }

  const onUpdateChecked = (e, id) => {
    const checked = e.target.checked
    console.log('onUpdateChecked:', id, checked)
    // id = 1
    // urgent = true
    updateItemChecked({ variables: { id, checked } })
  }

  const onUpdateName = (id, name) => {
    updateItemName({ variables: { id, name } })
  }

  return (
    <div>
      <input
        name="checked"
        type="checkbox"
        className=""
        onChange={(e) => {
          onUpdateChecked(e, item.id)
        }}
        checked={item.checked}
        // defaultChecked={item.checked || false}
      />
      <span
        className={`w-4 h-4 mx-2 rounded-lg ${
          item.urgent ? 'urgent' : 'normal'
        }`}
        onClick={(e) => onUpdateUrgent(item.id, !item.urgent, e)}
      ></span>
      <span className="">
        <input
          key={item.id}
          className="text-white bg-blue-500 border-b-2"
          type="text"
          defaultValue={item.name}
          onChange={(e) => onUpdateName(item.id, e.target.value, e)}
        />
      </span>
    </div>
  )
}

export default ShopNoteDisplay
