'use strict'
const Create = (Config, Article) => {
  let Menu = '<form class="hide print_hide" method="POST">' + '\n'
  let MenuLength = Config.length
  for (let i = 0; i < MenuLength; ++i) {
    let CheckedAttribut = Config[i].Hide ? '' : ' checked="checked"'
    Menu += '\t' + `<label class="label" for="HideShow-${Config[i].ID}">` + '\n'
    Menu += '\t' + `<input class="switch" name="HideShow-${Config[i].ID}" id="HideShow-${Config[i].ID}" type="checkbox"${CheckedAttribut} />` + '\n'
    Menu += '\t' + `${Config[i].Name}</label>` + '\n'
  }
  if (Config[0].ID === 'Patch_ID') {
    Menu += '\t' + `<br />` + '\n'
    Menu += '\t' + `<label class="label" for="HideShow-Patch_MultiPart">` + '\n'
    Menu += '\t' + `<input class="switch" name="HideShow-Patch_MultiPart" id="HideShow-Patch_MultiPart" type="checkbox" checked="checked" />` + '\n'
    Menu += '\t' + `Show Multi-part fixture</label>` + '\n'
  }
  Menu += '</form>'
  // Insert the menu
  Article.querySelector('h2').insertAdjacentHTML('afterend', Menu)
  // Set the Button menu listener
  let ButtonMenu = Article.querySelector('.nav-button')
  let Form = Article.querySelector('form')
  ButtonMenu.addEventListener('click', e => {
    e.preventDefault()
    ButtonMenu.classList.toggle('is-active')
    Form.classList.toggle('hide')
  })
  // Add listeners on all switchs
  let Switchs = Article.querySelectorAll('input.switch')
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
          ToShow[z].classList.toggle('hide')
        }
      }
    })
  }
}
module.exports = {
  Create
}
