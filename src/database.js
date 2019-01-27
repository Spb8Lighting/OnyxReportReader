const idb = require('idb')

const DbPromise = idb.openDb('ReportReader', 4, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('Show', { keyPath: 'Key' })
      const Fixture = upgradeDb.createObjectStore('Fixture', { keyPath: 'ID' })
      Fixture.createIndex('ID', 'ID', { unique: true })
      Fixture.createIndex('Ref', 'Ref', { unique: true })
      upgradeDb.createObjectStore('File', { keyPath: 'Key' })
    // eslint-disable-next-line no-fallthrough
    case 1:
      upgradeDb.createObjectStore('FixtureGroup', { keyPath: 'Key' })
    // eslint-disable-next-line no-fallthrough
    case 2:
      const Preset = upgradeDb.createObjectStore('Preset', { keyPath: 'ID' })
      Preset.createIndex('ID', 'ID', { unique: true })
      Preset.createIndex('Type', 'Type', { unique: false })
    // eslint-disable-next-line no-fallthrough
    case 3:
      upgradeDb.transaction.objectStore('Preset').createIndex('Position', 'Position', { unique: false })
  }
})

let Add = async Data => {
  let db = await DbPromise
  return db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).put(Data.Item)
}
let Get = async Data => {
  let db = await DbPromise
  if (Data.Index) {
    return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).index(Data.Index).get(Data.ItemID)
  } else {
    return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).get(Data.ItemID)
  }
}
let GetAll = async Data => {
  let db = await DbPromise
  return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).getAll()
}
let Update = async Data => {
  let db = await DbPromise
  return db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).put(Data.Item)
}
let Delete = async Data => {
  let db = await DbPromise
  return db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).delete(Data.ItemID)
}
let Fixture = {
  RemoveGroup: async () => {
    let Fixtures = await GetAll({ Object: 'Fixture' })
    let FixturesCount = Object.keys(Fixtures).length
    if (FixturesCount > 0) {
      for (let i = 0; i < FixturesCount; ++i) {
        let Fixture = Fixtures[i]
        if (Fixture.Groups.length > 0) {
          Fixture.Groups = []
          await Update({ Object: 'Fixture', Item: Fixture })
        }
      }
    }
  }
}
let DeleteTable = async Data => {
  if (Data.Object === 'Fixture') {
    await DeleteDB('ReportReader')
    return false
  }
  if (Data.Object === 'FixtureGroup') {
    await Fixture.RemoveGroup()
  }
  let db = await DbPromise
  await db.transaction('File', 'readwrite').objectStore('File').delete(Data.Object)
  await db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).clear()
  window.location.reload()
}
let DeleteDB = () => {
  return idb.deleteDb('ReportReader').then(window.location.reload())
}

module.exports = {
  Add, Get, GetAll, Update, Delete, Fixture, DeleteTable, DeleteDB
}
