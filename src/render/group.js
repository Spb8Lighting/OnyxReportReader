'use strict'
const DB = require('./../database')
const Display = require('./../display')
const GroupConfig = require('./../config/table').Group
const TableHTML = require('./../function/table')
const Menu = require('./../function/menu')
const PatchRender = require('./patch')
const Loader = require('./../loader')

let Render = (RenderPatch = true) => {
  return new Promise((resolve, reject) => {
    let Content = {
      thead: TableHTML.THead(GroupConfig),
      tbody: []
    }
    DB.GetAll({ Object: 'FixtureGroup' })
      .then(Groups => {
        DB.Get({ Object: 'Show', ItemID: 'Show' })
          .then(async Show => {
            for (let i = 0; i < Object.keys(Groups).length; ++i) {
              Content.tbody.push(await TableHTML.TBodyLine(GroupConfig, 0, Groups[i]))
            }
            Content.Description = 'Fixture groups summary: ' + Show.Name
            Content.Table = '<table class="fixturegroup">' + '\n' +
              '<thead>' + '\n' +
              Content.thead + '\n' +
              '</thead>' + '\n' +
              '<tbody>' + '\n' +
              Content.tbody.join('\n') + '\n' +
              '</tbody>' + '\n' +
              '</table>'

            let FixtureGroupArticle = document.getElementById('FixtureGroup')

            FixtureGroupArticle.innerHTML = `<h2><button class="nav-button print_hide" type="button" role="button"><i></i></button> Fixture Groups</h2><p>${Content.Description}</p>${Content.Table}`
            Menu.Create(GroupConfig, FixtureGroupArticle)
            Display.SetLoaded('FixtureGroup')
            if (RenderPatch) {
              PatchRender(false)
            } else {
              Loader.Hide()
              resolve(true)
            }
          })
      })
  })
}

module.exports = Render
