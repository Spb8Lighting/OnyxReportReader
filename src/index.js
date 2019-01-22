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
  if (window.getComputedStyle(Nav).display === 'none') {
    Nav.classList.remove('hide')
  } else {
    Nav.classList.add('hide')
  }
})
document.querySelector('.flex-container').addEventListener('click', () => document.querySelector('nav').classList.add('hide'))

// Parse all options
let Switchs = document.querySelectorAll('input.switch')
for (let i = 0; i < Switchs.length; ++i) {
  Switchs[i].addEventListener('change', e => {
    let Parameter = e.target.id.split('-')
    if (Parameter[0] === 'HideShow') {
      let ToShow = document.querySelectorAll(`.${Parameter[1]}`)
      if (Parameter[1] === 'Patch_MultiPart') {
        if (e.target.checked) {
          let Rowspans = document.querySelectorAll(`[data-rowspan]`)
          for (let y = 0; y < Rowspans.length; ++y) {
            Rowspans[y].setAttribute('rowspan', Rowspans[y].getAttribute('data-rowspan'))
          }
        } else {
          let Rowspans = document.querySelectorAll(`[rowspan]`)
          for (let y = 0; y < Rowspans.length; ++y) {
            Rowspans[y].removeAttribute('rowspan')
          }
        }
      }
      for (let z = 0; z < ToShow.length; ++z) {
        if (e.target.checked) {
          ToShow[z].classList.remove('hide')
        } else {
          ToShow[z].classList.add('hide')
        }
      }
    }
  })
}
