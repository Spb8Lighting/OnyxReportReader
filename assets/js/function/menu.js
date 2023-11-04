import { Set as LocalStorageSet, Get as LocalStorageGet } from '../localstorage.js'

const IsChecked = Default => Default ? ' checked="checked"' : ''

export default (Config, Article) => {
  const ArticleID = Article.getAttribute('id')
  let Menu = '<form class="hide print_hide" method="POST">' + '\n'
  const MenuLength = Config.length
  for (let i = 0; i < MenuLength; ++i) {
    Menu += '\t' + `<label class="label" for="HideShow-${Config[i].ID}">` + '\n'
    Menu += '\t' + `<input class="switch" name="HideShow-${Config[i].ID}" id="HideShow-${Config[i].ID}" type="checkbox"${IsChecked(Config[i].Show)} />` + '\n'
    Menu += '\t' + `${Config[i].Name}</label>` + '\n'
  }
  Menu += '\t' + `<br />` + '\n'
  Menu += '\t' + `<label class="label" for="HidePrint-${ArticleID}">` + '\n'
  Menu += '\t' + `<input class="switch" name="HidePrint-${ArticleID}" id="HidePrint-${ArticleID}" type="checkbox"${IsChecked(true)} />` + '\n'
  Menu += '\t' + `Printable</label>` + '\n'
  if (ArticleID === 'Patch') {
    Menu += '\t' + `<label class="label" for="HideShow-Patch_MultiPart">` + '\n'
    Menu += '\t' + `<input class="switch" name="HideShow-Patch_MultiPart" id="HideShow-Patch_MultiPart" type="checkbox"${IsChecked(true)} />` + '\n'
    Menu += '\t' + `Show Multi-part fixture</label>` + '\n'
  }
  Menu += '</form>'
  // Insert the menu
  Article.querySelector('h2').insertAdjacentHTML('afterend', Menu)
  // Set the Button menu listener
  const ButtonMenu = Article.querySelector('.nav-button')
  const Form = Article.querySelector('form')
  ButtonMenu.addEventListener('click', e => {
    e.preventDefault()
    ButtonMenu.classList.toggle('is-active')
    Form.classList.toggle('hide')
  })
  // Add listeners on all switchs
  const Switchs = Article.querySelectorAll('input.switch')
  for (let i = 0; i < Switchs.length; ++i) {
    Switchs[i].addEventListener('change', e => {
      const Parameter = e.target.id.split('-')
      if (Parameter[0] === 'HideShow') {
        const ToShow = document.querySelectorAll(`.${Parameter[1]}`)
        if (Parameter[1] === 'Patch_MultiPart') {
          if (e.target.checked) {
            const Rowspans = document.querySelectorAll(`[data-rowspan]`)
            for (let y = 0; y < Rowspans.length; ++y) {
              Rowspans[y].setAttribute('rowspan', Rowspans[y].getAttribute('data-rowspan'))
            }
          } else {
            const Rowspans = document.querySelectorAll(`[rowspan]`)
            for (let y = 0; y < Rowspans.length; ++y) {
              Rowspans[y].removeAttribute('rowspan')
            }
          }
        }
        for (let z = 0; z < ToShow.length; ++z) {
          ToShow[z].classList.toggle('hide')
        }
      } else if (Parameter[0] === 'HidePrint') {
        document.getElementById(Parameter[1]).classList.toggle('print_hide')
      }
      // Store value of the switch
      LocalStorageSet({ key: e.target.id, value: e.target.checked })
    })
    // Restore the switch value from localstorage
    const SwitchSaved = LocalStorageGet({ key: Switchs[i].id })
    if (SwitchSaved != null && SwitchSaved !== Switchs[i].checked) {
      Switchs[i].checked = !Switchs[i].checked
      // eslint-disable-next-line no-undef
      Switchs[i].dispatchEvent(new Event('change'))
    }
  }
}
