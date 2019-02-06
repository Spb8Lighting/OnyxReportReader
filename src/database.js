const Dexie = require('dexie').default

const db = new Dexie('ReportReader')

db.version(1).stores({
  File: 'Key',
  Show: 'Key',
  Fixture: '++,&ID,&Ref,Manufacturer,Model,Mode',
  FixtureGroup: 'Key',
  Preset: '++,ID, Type, Position',
  Cuelist: '++,ID, Type, &TypePagePosition, Page'
})

let Add = async Data => {
  return db[Data.Object]
    .add(Data.Item)
}
let Get = async Data => {
  if (Data.Index) {
    return db[Data.Object]
      .where(Data.Index)
      .equals(Data.ItemID)
      .first()
  } else {
    return db[Data.Object]
      .get(Data.ItemID)
  }
}
let GetAll = async Data => {
  return db[Data.Object]
    .toArray()
}
let AddGroup = async Data => {
  return db[Data.Object]
    .where(Data.Index)
    .equals(Data.ItemID)
    .modify(Fixture => Fixture.Groups.push(Data.GroupID))
}
let Update = async Data => {
  return db[Data.Object]
    .put(Data.Item)
}
let Delete = async Data => {
  return db[Data.Object]
    .delete(Data.ItemID)
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
    await DeleteDB()
    return false
  }
  if (Data.Object === 'FixtureGroup') {
    await Fixture.RemoveGroup()
  }
  await db.File
    .delete(Data.Object)
  await db[Data.Object]
    .clear()
  window.location.reload()
}
let DeleteDB = async () => {
  await Dexie.delete('ReportReader')
  window.location.reload()
}

module.exports = {
  db, Add, AddGroup, Get, GetAll, Update, Delete, Fixture, DeleteTable, DeleteDB
}
