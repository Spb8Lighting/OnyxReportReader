const idb = require('idb')

const DbPromise = idb.openDb('ReportReader', 1, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('Show', { keyPath: 'Key' })
      const Fixture = upgradeDb.createObjectStore('Fixture', { keyPath: 'ID' })
      Fixture.createIndex('ID', 'ID', { unique: true })
      Fixture.createIndex('Ref', 'Ref', { unique: true })
      upgradeDb.createObjectStore('File', { keyPath: 'Key' })
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
      return db.transaction(Data.Object, 'readonly').objectStore(Data.Object).get(Data.ItemID)
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
