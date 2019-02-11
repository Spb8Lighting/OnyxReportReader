import Dexie from 'dexie'

export const Db = new Dexie('ReportReader')

Db.version(1).stores({
  File: 'Key',
  Show: 'Key',
  Fixture: '++,&ID,&Ref,Manufacturer,Model,Mode',
  FixtureGroup: 'Key',
  Preset: '++,ID, Type, Position',
  Cuelist: '++,ID, Type, &TypePagePosition, Page'
})
Db.version(2).stores({
  Cuelist: '++,ID, Type',
  Physical: '++,PageBank, Type, Position, CuelistID'
}).upgrade(tx => {
  return tx.Cuelist.toCollection().modify(cuelist => {
    delete cuelist.Page
    delete cuelist.TypePagePosition
  })
})

export const Add = async Data => {
  return Db[Data.Object]
    .add(Data.Item)
}
export const Get = async Data => {
  if (Data.Index) {
    return Db[Data.Object]
      .where(Data.Index)
      .equals(Data.ItemID)
      .first()
  } else {
    return Db[Data.Object]
      .get(Data.ItemID)
  }
}
export const GetAll = async Data => {
  return Db[Data.Object]
    .toArray()
}
export const AddGroup = async Data => {
  return Db[Data.Object]
    .where(Data.Index)
    .equals(Data.ItemID)
    .modify(Fixture => Fixture.Groups.push(Data.GroupID))
}
export const Update = async Data => {
  return Db[Data.Object]
    .put(Data.Item)
}
export const Delete = async Data => {
  return Db[Data.Object]
    .delete(Data.ItemID)
}
export const Fixture = {
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
export const DeleteTable = async Data => {
  if (Data.Object === 'Fixture') {
    await DeleteDB()
    return false
  }
  if (Data.Object === 'FixtureGroup') {
    await Fixture.RemoveGroup()
  }
  await Db.File
    .delete(Data.Object)
  await Db[Data.Object]
    .clear()
  window.location.reload()
}
export const DeleteDB = async () => {
  await Dexie.delete('ReportReader')
  window.location.reload()
}
