import { db } from 'src/lib/db'

// super hacky workaround function by @rob 🚀
const foreignKeyReplacement = (input) => {
  let output = input
  const foreignKeys = Object.keys(input).filter((k) => k.match(/Id$/))
  foreignKeys.forEach((key) => {
    const modelName = key.replace(/Id$/, '')
    const value = input[key]
    delete output[key]
    output = Object.assign(output, {
      [modelName]: { connect: { id: value } },
    })
  })
  return output
}

export const items = () => {
  return db.item.findMany()
}

export const item = ({ id }) => {
  return db.item.findOne({
    where: { id },
  })
}

export const createItem = ({ input }) => {
  return db.item.create({ data: foreignKeyReplacement(input) })
}

export const updateItem = ({ id, input }) => {
  return db.item.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deleteItem = ({ id }) => {
  return db.item.delete({
    where: { id },
  })
}

export const Item = {
  note: (_obj, { root }) => db.item.findOne({ where: { id: root.id } }).note(),
}

export const updateItemUrgent = ({ id, urgent }) => {
  return db.item.update({
    data: { urgent },
    where: { id },
  })
}

export const updateItemChecked = ({ id, checked }) => {
  return db.item.update({
    data: { checked },
    where: { id },
  })
}

export const updateItemName = ({ id, name }) => {
  return db.item.update({
    data: { name },
    where: { id },
  })
}
