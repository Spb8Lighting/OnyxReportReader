'use strict'
const DB = require('./../database')
const PatchConfig = require('./../config/table').Patch
const TableHTML = require('./../function/table')
const Menu = require('./../function/menu')
const Display = require('./../display')
const Loader = require('./../loader')

const NoMultiInPatch = /^[0-9]+$/

let Render = (SetActive = true) => {
  return new Promise((resolve, reject) => {
    let Content = {
      thead: TableHTML.THead(PatchConfig),
      tbody: []
    }
    DB.GetAll({ Object: 'Fixture' })
      .then(Fixtures => {
        DB.Get({ Object: 'Show', ItemID: 'Show' })
          .then(async Show => {
            for (let i = 0; i < Object.keys(Fixtures).length; ++i) {
              let Fixture = Fixtures[i]
              if (NoMultiInPatch.test(Fixture.ID)) {
                let Multipart = 0
                if (Fixture.Multipart) {
                  Multipart = Object.keys(Fixture.Multipart).length
                }
                Content.tbody.push(await TableHTML.TBodyLine(PatchConfig, Multipart, Fixture))
                if (Fixture.Multipart) {
                  for (let i = 0; i < Multipart; ++i) {
                    let FixturePart = await DB.Get({ Object: 'Fixture', Index: 'ID', ItemID: Fixture.Multipart[i].ID })
                    FixturePart.Invert = Fixture.Invert
                    Content.tbody.push(await TableHTML.TBodyLine(PatchConfig, 0, FixturePart, true))
                  }
                }
              }
            }
            Content.Header = `Onyx Reports for "${Show.Name}" <em>(software build ${Show.Build})</em>`
            Content.Description = 'Patch summary: ' + Show.Name + ' <em>(' + Show.FixturesCount + ' fixture' + ((Show.FixturesCount > 1) ? 's' : '') + ')</em>'
            Content.Table = '<table class="patch">' + '\n' +
              '<thead>' + '\n' +
              Content.thead + '\n' +
              '</thead>' + '\n' +
              '<tbody>' + '\n' +
              Content.tbody.join('\n') + '\n' +
              '</tbody>' + '\n' +
              '</table>'

            let PatchArticle = document.getElementById('Patch')

            PatchArticle.innerHTML = `<h2><button class="nav-button print_hide" type="button" role="button"><i></i></button> Patch</h2><p>${Content.Description}</p>${Content.Table}`
            // Add the Table menu to filter column
            Menu.Create(PatchConfig, PatchArticle)
            document.querySelector('header>span').innerHTML = Content.Header
            if (SetActive) {
              Display.SetLoaded('Patch', SetActive)
            } else {
              // Show the Patch Group Column
              let ShowPatchGroup = document.getElementById('HideShow-Patch_Group')
              ShowPatchGroup.checked = 'checked'
              // eslint-disable-next-line no-undef
              ShowPatchGroup.dispatchEvent(new Event('change'))
              Loader.FixtureGroup.Hide()
            }
            Loader.Patch.Hide()
            resolve(true)
          })
      })
  })
}

module.exports = Render
