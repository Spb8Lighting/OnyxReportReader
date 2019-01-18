'use strict'
const DB = require('./../database')
const Display = require('./../display')

const NotFalse = val => {
  return val === false ? '' : val
}

let SetGroupTable = async (Content, Groups) => {
  for (let i = 0; i < Object.keys(Groups).length; ++i) {
    let Group = Groups[i]
    let Fixtures = 0
    let FixtureList = []
    if (Group.Fixtures) {
      Fixtures = Object.keys(Group.Fixtures).length
    }
    let GetAllFixtureId = async () => {
      if (Fixtures > 0) {
        for (let i = 0; i < Fixtures; ++i) {
          let Fixture = Group.Fixtures[i]
          let FixtureDB = await DB.Get({ Object: 'Fixture', Index: 'Ref', ItemID: Fixture })
          if (FixtureDB) {
            FixtureList.push(FixtureDB.ID)
          }
        }
      }
    }
    await GetAllFixtureId()
    Content.tbody.push('<tr>' + '\n' +
      '\t' + '<td class="number">' + Group.ID + '</td>' + '\n' +
      '\t' + '<td>' + NotFalse(Group.Name) + '</td>' + '\n' +
      '\t' + '<td>' + ((Group.Mask) ? 'True' : '') + '</a></td>' + '\n' +
      '\t' + '<td>' + FixtureList.join(', ') + '</td>' + '\n' +
      '</tr>')
  }
  return Content
}

let Render = () => {
  return new Promise((resolve, reject) => {
    let Content = {
      thead: '<tr>' + '\n' +
        '\t' + '<th>ID</th>' + '\n' +
        '\t' + '<th>Name</th>' + '\n' +
        '\t' + '<th>Mask</th>' + '\n' +
        '\t' + '<th>Fixtures</th>' + '\n' +
        '</tr>',
      tbody: []
    }
    DB.GetAll({ Object: 'FixtureGroup' })
      .then(Groups => {
        DB.Get({ Object: 'Show', ItemID: 'Show' })
          .then(Show => {
            SetGroupTable(Content, Groups)
              .then(Content => {
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

                FixtureGroupArticle.innerHTML = `<h2>Fixture Groups</h2><p>${Content.Description}</p>${Content.Table}`
                Display.SetLoaded('FixtureGroup')
                resolve(true)
              })
          })
      })
  })
}

module.exports = Render
