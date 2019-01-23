'use strict'
const DB = require('./../database')
const Display = require('./../display')
const Option = require('./../config/option')
const GroupConfig = require('./../config/table').Group
const TableHTML = require('./../function/table')
const Menu = require('./../function/menu')
const PatchRender = require('./patch')

let FixtureInfo = FixtureDB => {
  if (Option.Group.DisplaySimplifiedFixture) {
    if (FixtureDB.Name) {
      return `#${FixtureDB.ID} ${FixtureDB.Manufacturer} - ${FixtureDB.Model}(${FixtureDB.Name}) @ ${FixtureDB.Universe}.${FixtureDB.Address}`
    } else {
      return `#${FixtureDB.ID} ${FixtureDB.Manufacturer} - ${FixtureDB.Model} @ ${FixtureDB.Universe}.${FixtureDB.Address}`
    }
  } else {
    if (FixtureDB.Name) {
      return `ID: ${FixtureDB.ID}, Name: ${FixtureDB.Name}, Manufacturer: ${FixtureDB.Manufacturer}, Model: ${FixtureDB.Model}, Address: ${FixtureDB.Universe}.${FixtureDB.Address}`
    } else {
      return `ID: ${FixtureDB.ID}, Manufacturer: ${FixtureDB.Manufacturer}, Model: ${FixtureDB.Model}, Address: ${FixtureDB.Universe}.${FixtureDB.Address}`
    }
  }
}

let Render = () => {
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
              let Group = Groups[i]
              let Fixtures = 0
              let FixtureList = []
              if (Group.Fixtures) {
                Fixtures = Object.keys(Group.Fixtures).length
              }
              if (Fixtures > 0) {
                for (let i = 0; i < Fixtures; ++i) {
                  let Fixture = Group.Fixtures[i]
                  let FixtureDB = await DB.Get({ Object: 'Fixture', Index: 'Ref', ItemID: Fixture })
                  if (FixtureDB) {
                    FixtureList.push(`<span data-title="${FixtureInfo(FixtureDB)}">${FixtureDB.ID}</span>`)
                  }
                }
              }
              Group.Fixtures = FixtureList
              Content.tbody.push(await TableHTML.TBodyLine(GroupConfig, 0, Group))
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
            PatchRender(false)
          })
      })
  })
}

module.exports = Render
