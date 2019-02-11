import '@babel/polyfill'
import Input from './input'
import { Db, Get as DbGet, DeleteTable as DbDeleteTable, DeleteDB as DbDeleteDB } from './database'
import Render from './function/render'
import * as Loader from './loader'
import { Clear as LocalStorageClear } from './localstorage'

// FORCE HTTPS
if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http://', 'https://')
}
if (window.location.hostname !== 'localhost') {
  // Check that service workers are registered
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('ServiceWorker registration successful with scope: ', registration.scope))
      .catch(err => console.error('ServiceWorker registration failed: ', err))
  }
}

// Change the form label by their associated picture
Input()
  .then(async () => {
    // Get File data
    await Db.transaction('r', Db.File, Db.Show, Db.Fixture, Db.FixtureGroup, Db.Preset, Db.Cuelist, Db.Physical, async () => {
      let ReloadPatch = await DbGet({ Object: 'File', ItemID: 'Patch' })
      let ReloadGroup = await DbGet({ Object: 'File', ItemID: 'FixtureGroup' })
      let ReloadPreset = await DbGet({ Object: 'File', ItemID: 'Preset' })
      let ReloadCuelist = await DbGet({ Object: 'File', ItemID: 'Cuelist' })

      // Get Patch data
      if (typeof ReloadPatch !== 'undefined') {
        Loader.Patch.Show()
        Render('Patch', true).then(() => Loader.Patch.Hide())
      }
      // Get Group data
      if (typeof ReloadGroup !== 'undefined') {
        Loader.FixtureGroup.Show()
        Render('Group', false, false).then(() => Loader.FixtureGroup.Hide())
      }
      // Get Preset data
      if (typeof ReloadPreset !== 'undefined') {
        Loader.Preset.Show()
        Render('Preset', false).then(() => Loader.Preset.Hide())
      }
      // Get Cuelist data
      if (typeof ReloadCuelist !== 'undefined') {
        Loader.Cuelist.Show()
        Render('Cuelist', false).then(() => Loader.Cuelist.Hide())
      }
    })
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
const HideMenu = e => {
  if (e.target.nodeName !== 'IMG') {
    document.querySelectorAll('nav').forEach(element => element.classList.add('hide'))
  }
}
document.querySelector('div.flex-container').addEventListener('click', e => HideMenu(e))
document.querySelector('header').addEventListener('click', e => HideMenu(e))
