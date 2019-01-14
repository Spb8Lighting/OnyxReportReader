// let StorageMethod = localStorage
let StorageMethod = sessionStorage

module.exports = {
  Get: content => {
    if (typeof content.key !== 'undefined') {
      let LocalKeyContent = StorageMethod.getItem(content.key)
      if (LocalKeyContent != null) {
        return JSON.parse(LocalKeyContent)
      } else {
        return false
      }
    } else {
      return false
    }
  },
  Set: content => {
    if (typeof content.key !== 'undefined') {
      StorageMethod.setItem(content.key, JSON.stringify(content.value))
      return true
    } else {
      return false
    }
  },
  Stats: () => {
    let data
    console.groupCollapsed('Current storage:')
    console.groupCollapsed('Details:')
    for (let key in StorageMethod) {
      if (StorageMethod.hasOwnProperty(key)) {
        data += StorageMethod[key]
        console.log(key + ' = ' + ((StorageMethod[key].length * 16) / (8 * 1024)).toFixed(2) + ' KB')
      }
    }
    console.groupEnd()
    console.info(data ? '\n' + 'Total space used: ' + ((data.length * 16) / (8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)')
    console.info(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) + ' KB' : '5 MB')
    console.groupEnd()
  }
}
