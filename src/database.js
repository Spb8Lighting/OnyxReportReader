const idb = require('idb')

const DbPromise = idb.openDb('ReportReader', 3, upgradeDb => {
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
  }
})

module.exports = {
  Add: Data => {
    return DbPromise.then(db => {
      let tx = db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).put(Data.Item)
      return tx.complete
    })
  },
  Get: Data => {
    return DbPromise.then(db => {
      if (Data.Index) {
        return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).index(Data.Index).get(Data.ItemID)
      } else {
        return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).get(Data.ItemID)
      }
    })
  },
  GetAll: Data => {
    return DbPromise.then(db => {
      return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).getAll()
    })
  },
  Update: Data => {
    return DbPromise.then(db => {
      let tx = db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).put(Data.Item)
      return tx.complete
    })
  },
  Delete: Data => {
    return DbPromise.then(db => {
      let tx = db.transaction(Data.Object, 'readwrite').objectStore(Data.Object).delete(Data.ItemID)
      return tx.complete
    })
  },
  DeleteDB: DBName => {
    return idb.deleteDb(DBName).then(window.location.reload())
  }
}
