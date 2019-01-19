'use strict'
const DB = require('./../database')
const Display = require('./../display')

const NoMultiInPatch = /^[0-9]+$/

const NotFalse = val => {
  return val === false ? '' : val
}

let Render = () => {
  return new Promise((resolve, reject) => {
    let Content = {
      thead: '<tr>' + '\n' +
        '\t' + '<th>ID</th>' + '\n' +
        '\t' + '<th>Name</th>' + '\n' +
        '\t' + '<th>Manufacturer</th>' + '\n' +
        '\t' + '<th>Model</th>' + '\n' +
        '\t' + '<th>Personality</th>' + '\n' +
        '\t' + '<th>Universe</th>' + '\n' +
        '\t' + '<th>Address</th>' + '\n' +
        '\t' + '<th>Invert</th>' + '\n' +
        '</tr>',
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
                Content.tbody.push('<tr' + ((Multipart > 0) ? ' class="masterpart" data-id="' + Fixture.ID + '"' : '') + '>' + '\n' +
                  '\t' + '<td class="number">' + Fixture.ID + '</td>' + '\n' +
                  '\t' + '<td>' + NotFalse(Fixture.Name) + '</td>' + '\n' +
                  '\t' + '<td' + ((Multipart > 0) ? ' rowspan="' + (Multipart + 1) + '"' : '') + '><a target="_blank" href="https://onyxfixturefinder.com/#SearchMode=live&amp;DisplayMode=1&amp;Manufacturer=' + encodeURIComponent(Fixture.Manufacturer) + '" />' + Fixture.Manufacturer + '</a></td>' + '\n' +
                  '\t' + '<td' + ((Multipart > 0) ? ' rowspan="' + (Multipart + 1) + '"' : '') + '><a target="_blank" href="https://onyxfixturefinder.com/fixture/' + encodeURIComponent(Fixture.Manufacturer) + '/' + encodeURIComponent(Fixture.Model) + '" />' + Fixture.Model + '</a></td>' + '\n' +
                  '\t' + '<td' + ((Multipart > 0) ? ' rowspan="' + (Multipart + 1) + '"' : '') + '>' + Fixture.Mode + '</td>' + '\n' +
                  '\t' + '<td' + ((Multipart > 0) ? ' rowspan="' + (Multipart + 1) + '"' : '') + ' class="number">' + NotFalse(Fixture.Universe) + '</td>' + '\n' +
                  '\t' + '<td' + ((Multipart > 0) ? ' rowspan="' + (Multipart + 1) + '"' : '') + ' class="number">' + NotFalse(Fixture.Address) + '</td>' + '\n' +
                  '\t' + '<td>' + NotFalse(Fixture.Invert) + '</td>' + '\n' +
                  '</tr>')
                if (Fixture.Multipart) {
                  for (let i = 0; i < Multipart; ++i) {
                    let FixturePart = await DB.Get({ Object: 'Fixture', Index: 'ID', ItemID: Fixture.Multipart[i].ID })
                    Content.tbody.push('<tr class="multipart" data-id="' + Fixture.ID + '">' + '\n' +
                      '\t' + '<td class="number txtright">' + FixturePart.ID + '</td>' + '\n' +
                      '\t' + '<td>' + NotFalse(FixturePart.Name) + '</td>' + '\n' +
                      '\t' + '<td>' + NotFalse(Fixture.Invert) + '</td>' + '\n' +
                      '</tr>')
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

            PatchArticle.innerHTML = `<h2>Patch</h2><p>${Content.Description}</p>${Content.Table}`
            document.querySelector('header>span').innerHTML = Content.Header
            Display.SetLoaded('Patch')
            resolve(true)
          })
      })
  })
}

module.exports = Render
