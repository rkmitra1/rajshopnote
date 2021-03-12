import { useMutation, useFlash } from '@redwoodjs/web'
import { PlusCircle, XCircle, Save, Trash2 } from 'react-feather'
import { format, formatDistanceToNow } from 'date-fns'
import debounce from 'lodash.debounce'
import React, { useCallback } from 'react'

import { QUERY } from 'src/components/ShopNotesCell'

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

const ShopNoteItemDisplay = ({ item }) => {
  const [updateItemUrgent] = useMutation(UPDATE_ITEM_URGENT_MUTATION)
  const [updateItemChecked] = useMutation(UPDATE_ITEM_CHECKED_MUTATION)
  const [updateItemName] = useMutation(UPDATE_ITEM_NAME_MUTATION)
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onUpdateUrgent = (id, urgent) => {
    console.log('onUpdateUrgent:', id, urgent)
    updateItemUrgent({ variables: { id, urgent } })
  }

  const onUpdateChecked = (e, id) => {
    const checked = e.target.checked
    console.log('onUpdateChecked:', id, checked)
    updateItemChecked({ variables: { id, checked } })
  }

  const debouncedUpdateName = useCallback(
    debounce((id, name) => updateItemName({ variables: { id, name } }), 1000),
    [] // will be created only once initially
  )

  const onUpdateName = (id, name) => {
    debouncedUpdateName(id, name)
    // updateItemName({ variables: { id, name } })
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
      // window.location.reload()
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
    // window.location.reload()
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

export default ShopNoteItemDisplay
