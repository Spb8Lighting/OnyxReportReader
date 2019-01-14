import Input from './input'
import DB from './database'
import PatchRender from './render/patch'

// Change the form label by their associated picture
Input()

DB.Get({ Object: 'File', ItemID: 'Patch' })
  .then(item => {
    if (typeof item !== 'undefined') {
      PatchRender()
    }
  })

document.querySelector('a[href="#Reset"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteDB('ReportReader')
})
