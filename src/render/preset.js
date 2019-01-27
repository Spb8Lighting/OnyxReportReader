'use strict'
const DB = require('./../database')
const Display = require('./../display')
const PresetConfig = require('./../config/table').Preset
const TableHTML = require('./../function/table')
const Menu = require('./../function/menu')
const PatchRender = require('./patch')

let Render = () => {
  return new Promise((resolve, reject) => {
    let Content = {
      thead: TableHTML.THead(PresetConfig),
      tbody: []
    }
    DB.GetAll({ Object: 'Preset' })
      .then(Presets => {
        DB.Get({ Object: 'Show', ItemID: 'Show' })
          .then(async Show => {
            for (let i = 0; i < Object.keys(Presets).length; ++i) {
              Content.tbody.push(await TableHTML.TBodyLine(PresetConfig, 0, Presets[i]))
            }
            Content.Description = 'Presets summary: ' + Show.Name
            Content.Table = '<table class="preset">' + '\n' +
              '<thead>' + '\n' +
              Content.thead + '\n' +
              '</thead>' + '\n' +
              '<tbody>' + '\n' +
              Content.tbody.join('\n') + '\n' +
              '</tbody>' + '\n' +
              '</table>'

            let PresetArticle = document.getElementById('Preset')

            PresetArticle.innerHTML = `<h2><button class="nav-button print_hide" type="button" role="button"><i></i></button> Presets</h2><p>${Content.Description}</p>${Content.Table}`
            Menu.Create(PresetConfig, PresetArticle)
            Display.SetLoaded('Preset')
            PatchRender(false)
          })
      })
  })
}

module.exports = Render
