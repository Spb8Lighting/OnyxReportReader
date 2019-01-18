import Input from './input'
import DB from './database'
import PatchRender from './render/patch'
import GroupRender from './render/group'

// Change the form label by their associated picture
Input()
  // Get Patch data
  .then(() => DB.Get({ Object: 'File', ItemID: 'Patch' }))
  // Display Patch
  .then(Item => {
    if (typeof Item !== 'undefined') {
      return PatchRender()
    } else {
      throw new Error('No Patch')
    }
  })
  // Get Group data
  .then(() => DB.Get({ Object: 'File', ItemID: 'FixtureGroup' }))
  // Display Group
  .then(Item => {
    if (typeof Item !== 'undefined') {
      return GroupRender()
    } else {
      throw new Error('No Group')
    }
  })
  // End of reload data
  .then(() => console.log('Render ended'))
  // Catch error
  .catch(reject => console.info(reject))

// Reset Link
document.querySelector('a[href="#Reset"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteDB('ReportReader')
})
