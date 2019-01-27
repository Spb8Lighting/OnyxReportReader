import '@babel/polyfill'
import Loader from './loader'
import Input from './input'
import DB from './database'
import PatchRender from './render/patch'
import GroupRender from './render/group'
import PresetRender from './render/preset'

// FORCE HTTPS
if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http://', 'https://')
  // Check that service workers are registered
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
  }
}

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
      return Promise.resolve('No Patch')
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
      return GroupRender(false)
    } else {
      return Promise.resolve('No Group')
    }
  })
  // Get Preset data
  .then(() => {
    Loader.Show()
    return DB.Get({ Object: 'File', ItemID: 'Preset' })
  })
  // Display Group
  .then(Item => {
    if (typeof Item !== 'undefined') {
      return PresetRender()
    } else {
      return Promise.resolve('No Preset')
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
document.querySelector('a[href="#ResetAll"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteDB()
})
document.querySelector('a[href="#ResetGroup"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteTable({ Object: 'FixtureGroup' })
})
document.querySelector('a[href="#ResetPreset"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteTable({ Object: 'Preset' })
})
document.querySelector('a[href="#Menu"]').addEventListener('click', e => {
  e.preventDefault()
  let Nav = document.querySelector('nav')
  Nav.classList.toggle('hide')
})
document.querySelector('.flex-container').addEventListener('click', () => document.querySelector('nav').classList.add('hide'))
