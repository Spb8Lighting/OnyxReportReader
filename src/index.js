import '@babel/polyfill'
import Input from './input'
import { Get as DbGet, DeleteTable as DbDeleteTable, DeleteDB as DbDeleteDB } from './database'
import Render from './function/render'
import * as Loader from './loader'
import { Clear as LocalStorageClear } from './localstorage'

// FORCE HTTPS
if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http://', 'https://')
}
// Check that service workers are registered
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js').then(function(registration) {
		// Registration was successful
		console.log('ServiceWorker registration successful with scope: ',    registration.scope)
	}).catch(function(err) {
		// registration failed :(
		console.error('ServiceWorker registration failed: ', err)
	})
}

// Change the form label by their associated picture
Input()
  // Get Patch data
  .then(async () => {
    Loader.Patch.Show()
    if (typeof await DbGet({ Object: 'File', ItemID: 'Patch' }) !== 'undefined') {
      await Render('Patch', true)
    }
    Loader.Patch.Hide()
  })
  // Get Group data
  .then(async () => {
    Loader.FixtureGroup.Show()
    if (typeof await DbGet({ Object: 'File', ItemID: 'FixtureGroup' }) !== 'undefined') {
      await Render('Group', false, false)
    }
    Loader.FixtureGroup.Hide()
  })
  // Get Preset data
  .then(async () => {
    Loader.Preset.Show()
    if (typeof await DbGet({ Object: 'File', ItemID: 'Preset' }) !== 'undefined') {
      await Render('Preset', false)
    }
    Loader.Preset.Hide()
  })
  // Get Cuelist data
  .then(async () => {
    Loader.Cuelist.Show()
    if (typeof await DbGet({ Object: 'File', ItemID: 'Cuelist' }) !== 'undefined') {
      await Render('Cuelist', false)
    }
    Loader.Cuelist.Hide()
  })
  // End of reload data
  .then(() => {
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
  DbDeleteDB()
})
document.querySelector('a[href="#ResetGroup"]').addEventListener('click', e => {
  e.preventDefault()
  DbDeleteTable({ Object: 'FixtureGroup' })
})
document.querySelector('a[href="#ResetPreset"]').addEventListener('click', e => {
  e.preventDefault()
  DbDeleteTable({ Object: 'Preset' })
})
document.querySelector('a[href="#ResetCuelist"]').addEventListener('click', e => {
  e.preventDefault()
  DbDeleteTable({ Object: 'Cuelist' })
})
document.querySelector('a[href="#ResetLayout"]').addEventListener('click', e => {
  e.preventDefault()
  LocalStorageClear()
  window.location.reload()
})
// Hide Show of right menu
document.querySelectorAll('#iconbox a').forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault()
    let ActualSelector = document.querySelector((e.target.nodeName === 'IMG') ? e.target.parentNode.hash : e.target.hash)
    document.querySelectorAll('nav').forEach(element => {
      if (element === ActualSelector) {
        element.classList.toggle('hide')
      } else {
        element.classList.add('hide')
      }
    })
  })
})
document.querySelector('.flex-container').addEventListener('click', () => document.querySelector('nav').classList.add('hide'))
