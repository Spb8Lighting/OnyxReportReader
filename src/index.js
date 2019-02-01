import '@babel/polyfill'
import Input from './input'
import DB from './database'
import Render from './function/render'
import Loader from './loader'
import LocalStorage from './localstorage'

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
  .then(async () => {
    Loader.Patch.Show()
    if (typeof await DB.Get({ Object: 'File', ItemID: 'Patch' }) !== 'undefined') {
      await Render('Patch', true)
    }
    Loader.Patch.Hide()
  })
  // Get Group data
  .then(async () => {
    Loader.FixtureGroup.Show()
    if (typeof await DB.Get({ Object: 'File', ItemID: 'FixtureGroup' }) !== 'undefined') {
      await Render('Group', false, false)
    }
    Loader.FixtureGroup.Hide()
  })
  // Get Preset data
  .then(async () => {
    Loader.Preset.Show()
    if (typeof await DB.Get({ Object: 'File', ItemID: 'Preset' }) !== 'undefined') {
      await Render('Preset', false)
    }
    Loader.Preset.Hide()
  })
  // Get Cuelist data
  .then(async () => {
    Loader.Cuelist.Show()
    if (typeof await DB.Get({ Object: 'File', ItemID: 'Cuelist' }) !== 'undefined') {
      await Render('Cuelist', false)
    }
    Loader.Cuelist.Hide()
  })
  // End of reload data
  .then(() => {
    // console.log('Render ended')
    Loader.Patch.Hide()
    Loader.FixtureGroup.Hide()
    Loader.Preset.Hide()
    Loader.Cuelist.Hide()
  })
  // Catch error
  .catch(reject => {
    console.log(reject)
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
document.querySelector('a[href="#ResetCuelist"]').addEventListener('click', e => {
  e.preventDefault()
  DB.DeleteTable({ Object: 'Cuelist' })
})
document.querySelector('a[href="#ResetLayout"]').addEventListener('click', e => {
  e.preventDefault()
  LocalStorage.Clear()
  window.location.reload()
})
document.querySelector('a[href="#Menu"]').addEventListener('click', e => {
  e.preventDefault()
  let Nav = document.querySelector('nav')
  Nav.classList.toggle('hide')
})
document.querySelector('.flex-container').addEventListener('click', () => document.querySelector('nav').classList.add('hide'))
