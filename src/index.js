import Input from './input'
import DB from './database'
import PatchRender from './render/patch'
import GroupRender from './render/group'

// Change the form label by their associated picture
Input()

// Load Patch if this last exists
DB.Get({ Object: 'File', ItemID: 'Patch' })
  .then(item => {
    if (typeof item !== 'undefined') {
      PatchRender()
    }
    // Load Fixture Group if Patch has been already done
    DB.Get({ Object: 'File', ItemID: 'FixtureGroup' })
      .then(item => {
        if (typeof item !== 'undefined') {
          GroupRender()
        }
      })
  })

// Reset Link
document.querySelector('a[href="#Reset"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteDB('ReportReader')
})
