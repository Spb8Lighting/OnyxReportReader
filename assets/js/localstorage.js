// eslint-disable-next-line no-undef
const StorageMethod = localStorage
// eslint-disable-next-line no-undef
// const StorageMethod = sessionStorage

export const Clear = () => {
  return StorageMethod.clear()
}
export const Remove = content => {
  if (typeof content.key !== 'undefined') {
    return StorageMethod.removeItem(content.key)
  } else {
    return false
  }
}
export const Get = content => {
  if (typeof content.key !== 'undefined') {
    const LocalKeyContent = StorageMethod.getItem(content.key)
    if (LocalKeyContent != null) {
      return JSON.parse(LocalKeyContent)
    } else {
      return null
    }
  } else {
    return null
  }
}
export const Set = content => {
  if (typeof content.key !== 'undefined') {
    return StorageMethod.setItem(content.key, JSON.stringify(content.value))
  } else {
    return false
  }
}
export const Stats = () => {
  let data = ''
  console.groupCollapsed('Current storage:')
  console.groupCollapsed('Details:')
  for (const key in StorageMethod) {
    if (Object.prototype.hasOwnProperty.call(StorageMethod, key)) {
      data += StorageMethod[key]
      console.log(key + ' = ' + ((StorageMethod[key].length * 16) / (8 * 1024)).toFixed(2) + ' KB')
    }
  }
  console.groupEnd()
  console.info(data ? '\n' + 'Total space used: ' + ((data.length * 16) / (8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)')
  console.info(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) + ' KB' : '5 MB')
  console.groupEnd()
}
