import '@babel/polyfill'
import Loader from './loader'
import Input from './input'
import DB from './database'
import PatchRender from './render/patch'
import GroupRender from './render/group'

// Change the form label by their associated picture
Input()
  // Get Patch data
  .then(() => {
    Loader.Show()
    return DB.Get({ Object: 'File', ItemID: 'Patch' })
  })
  // Display Patch
  .then(Item => {
    if (typeof Item !== 'undefined') {
      return PatchRender()
    } else {
      throw new Error('No Patch')
    }
  })
  // Get Group data
  .then(() => {
    Loader.Show()
    return DB.Get({ Object: 'File', ItemID: 'FixtureGroup' })
  })
  // Display Group
  .then(Item => {
    if (typeof Item !== 'undefined') {
      return GroupRender()
    } else {
      throw new Error('No Group')
    }
  })
  // End of reload data
  .then(() => {
    Loader.Hide()
    console.log('Render ended')
  })
  // Catch error
  .catch(reject => {
    Loader.Hide()
    console.info(reject)
  })

// Reset Link
document.querySelector('a[href="#Reset"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteDB()
})
document.querySelector('a[href="#NewGroup"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteTable({ Object: 'FixtureGroup' })
})
document.querySelector('a[href="#Menu"]').addEventListener('click', e => {
  e.preventDefault()
  let Nav = document.querySelector('nav')
  Nav.classList.toggle('hide')
})
document.querySelector('.flex-container').addEventListener('click', () => document.querySelector('nav').classList.add('hide'))
