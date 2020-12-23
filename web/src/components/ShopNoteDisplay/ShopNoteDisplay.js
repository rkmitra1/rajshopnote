import { routes, navigate, Redirect } from '@redwoodjs/router'
import { useMutation, useFlash } from '@redwoodjs/web'
import React, { useState } from 'react'
import { PlusCircle, XCircle, Save, Trash2 } from 'react-feather'
import { format, formatDistanceToNow } from 'date-fns'

import { QUERY } from 'src/components/ShopNotesCell'

const UPDATE_SHOP_NOTE_NAME_MUTATION = gql`
  mutation UpdateShopNoteNameMutation($id: Int!, $name: String!) {
    updateShopNoteName(id: $id, name: $name) {
      id
      __typename
      name
    }
  }
`

const UPDATE_SHOP_NOTE_DESCRIPTION_MUTATION = gql`
  mutation UpdateShopNoteDescriptionMutation($id: Int!, $description: String!) {
    updateShopNoteDescription(id: $id, description: $description) {
      id
      __typename
      description
    }
  }
`

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

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
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
const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const DELETE_SHOP_NOTE_MUTATION = gql`
  mutation DeleteShopNoteMutation($id: Int!) {
    deleteShopNote(id: $id) {
      id
    }
  }
`

const ShopNoteDisplay = ({ shopnote }) => {
  const { addMessage } = useFlash()

  const [updateShopNoteName] = useMutation(UPDATE_SHOP_NOTE_NAME_MUTATION)
  const [updateShopNoteDescription] = useMutation(
    UPDATE_SHOP_NOTE_DESCRIPTION_MUTATION
  )

  const [deleteShopNote] = useMutation(DELETE_SHOP_NOTE_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION)

  const onDeleteClick = (shopnote) => {
    if (
      confirm(
        'Are you sure you want to delete shopNote ' +
          shopnote.id +
          ' "' +
          shopnote.name +
          '" ?'
      )
    ) {
      const id = shopnote.id
      deleteShopNote({ variables: { id } })
    }
  }

  const onClickAddItem = (noteId) => {
    const newItem = {
      name: '',
      urgent: false,
      checked: false,
      noteId: noteId,
    }
    console.log('onClickAddItem: ', newItem)
    createItem({ variables: { input: newItem } })
    window.location.reload()
  }

  const onUpdateShopNoteName = (id, name) => {
    updateShopNoteName({ variables: { id, name } })
  }

  const onUpdateShopNoteDescription = (id, description) => {
    updateShopNoteDescription({ variables: { id, description } })
  }

  return (
    <div className="w-96 m-1 p-4 pt-2 bg-blue-500 rounded-xl border-gray-500 border-2 shadow-md">
      <header className="flex justify-between items-center">
        <h1 className="text-lg">
          <span className="">
            <input
              key={shopnote.id}
              className="text-white bg-blue-500  w-40"
              type="text"
              defaultValue={shopnote.name}
              onChange={(e) =>
                onUpdateShopNoteName(shopnote.id, e.target.value, e)
              }
            />
          </span>
        </h1>

        <a
          href="#"
          title={'Delete shopNote ' + shopnote.id}
          className="text-sm border-white border bg-red-500 rounded-md px-1 -pb-1"
          onClick={() => onDeleteClick(shopnote)}
        >
          Delete
        </a>
      </header>

      <div className="flex justify-between items-center">
        <hr className="w-1/3 display: inline-block" />
        <span className="text-grey-darker text-xs mx-2">
          {format(new Date(shopnote.updatedAt), 'MM/dd/yyyy')}
        </span>
        <hr className="w-1/3 display: inline-block" />
      </div>

      <span className="">
        <input
          key={shopnote.id}
          className="text-sm bg-blue-500  w-80 mb-2"
          type="text"
          defaultValue={shopnote.description}
          onChange={(e) =>
            onUpdateShopNoteDescription(shopnote.id, e.target.value, e)
          }
        />
      </span>

      {/* <div className="text-sm mb-2">{shopnote.description}</div> */}

      {!shopnote.items.length && (
        <span>
          <PlusCircle
            className="display: inline-block mx-1 w-4 h-4"
            onClick={(e) => onClickAddItem(shopnote.id, e)}
          ></PlusCircle>
        </span>
      )}

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
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION)
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION)

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

  const onClickDeleteItem = (item) => {
    console.log('onClickDeleteItem')
    if (
      confirm(
        'Are you sure you want to delete item ' +
          item.id +
          ' "' +
          item.name +
          '" ?'
      )
    ) {
      const id = item.id
      deleteItem({ variables: { id } })
      window.location.reload()
    }
  }

  const onClickAddItem = (noteId) => {
    const newItem = {
      name: '',
      urgent: false,
      checked: false,
      noteId: noteId,
    }
    console.log('onClickAddItem: ', newItem)
    createItem({ variables: { input: newItem } })
    window.location.reload()
  }

  return (
    <div className="text-sm">
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
          className="text-white bg-blue-500 border-b-2 w-56"
          type="text"
          defaultValue={item.name}
          onChange={(e) => onUpdateName(item.id, e.target.value, e)}
        />
      </span>
      <span>
        <PlusCircle
          className="display: inline-block mx-1 w-4 h-4"
          onClick={(e) => onClickAddItem(item.noteId, e)}
        ></PlusCircle>
      </span>
      <span>
        <Trash2
          className="display: inline-block mx-1 w-4 h-4"
          onClick={(e) => onClickDeleteItem(item)}
        ></Trash2>
      </span>
    </div>
  )
}

export default ShopNoteDisplay
