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

export const shopNotes = () => {
  return db.shopNote.findMany()
}

export const shopNote = ({ id }) => {
  return db.shopNote.findOne({
    where: { id },
  })
}

export const createShopNote = ({ input }) => {
  return db.shopNote.create({ data: foreignKeyReplacement(input) })
}

export const updateShopNote = ({ id, input }) => {
  return db.shopNote.update({
    data: input,
    where: { id },
  })
}

export const deleteShopNote = ({ id }) => {
  return db.shopNote.delete({
    where: { id },
  })
}

export const ShopNote = {
  items: (_obj, { root }) =>
    db.shopNote.findOne({ where: { id: root.id } }).items(),
}

export const updateShopNoteName = ({ id, name }) => {
  return db.shopNote.update({
    data: { name },
    where: { id },
  })
}
