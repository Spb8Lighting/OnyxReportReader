'use strict'
const DB = require('./../database')
const Option = require('./../config/option')
const PatchConfig = require('./../config/table').Patch
const Display = require('./../display')
const Loader = require('./../loader')

const NoMultiInPatch = /^[0-9]+$/

const ComputeTHead = () => {
  let Thead = '<tr>' + '\n'
  let TheadLength = PatchConfig.length
  for (let i = 0; i < TheadLength; ++i) {
    let ClassAttribut = PatchConfig[i].Hide ? `${PatchConfig[i].ID} hide` : PatchConfig[i].ID
    Thead += '\t' + `<th class="${ClassAttribut}">${PatchConfig[i].Name}</th>` + '\n'
  }
  Thead += '</tr>'
  return Thead
}
const ComputeTBodyLine = async (Multipart, Fixture, Restricted = false) => {
  let MultiPartClass = Restricted ? 'Patch_MultiPart' : 'MultiPart'
  let MultiPartID = Multipart > 0 || Restricted ? ` class="${MultiPartClass}" data-id="${Fixture.ID}"` : ''
  let RowSpanCount = Multipart + 1
  let RowSpan = Multipart > 0 ? ` data-rowspan="${RowSpanCount}" rowspan="${RowSpanCount}"` : ''
  let Tbody = `<tr${MultiPartID}>` + '\n'
  let TablePatch = PatchConfig
  let TbodyLength = TablePatch.length
  if (Restricted) {
    TablePatch = []
    for (let i = 0; i < TbodyLength; ++i) {
      if (PatchConfig[i].MultiPart) {
        TablePatch.push(PatchConfig[i])
      }
    }
    TbodyLength = TablePatch.length
  }
  for (let i = 0; i < TbodyLength; ++i) {
    let ClassAttribut = TablePatch[i].Hide ? `${TablePatch[i].ID} hide` : TablePatch[i].ID
    let RowContent = ''
    let LocalRowSpan = ''
    switch (TablePatch[i].ID) {
      case 'Patch_ID':
        RowContent = Fixture.ID
        break
      case 'Patch_Name':
        RowContent = NotFalse(Fixture.Name)
        break
      case 'Patch_Group':
        RowContent = await GetAllGroups(Fixture)
        break
      case 'Patch_Fixture':
        RowContent = `<a target="_blank" href="https://onyxfixturefinder.com/fixture/${encodeURIComponent(Fixture.Manufacturer)}/${encodeURIComponent(Fixture.Model)}" />${Fixture.Manufacturer} - ${Fixture.Model}</a> <em>(${Fixture.Mode})</em>`
        break
      case 'Patch_Manufacturer':
        RowContent = `<a target="_blank" href="https://onyxfixturefinder.com/#SearchMode=live&amp;DisplayMode=1&amp;Manufacturer=${encodeURIComponent(Fixture.Manufacturer)}" />${Fixture.Manufacturer}</a>`
        break
      case 'Patch_Model':
        RowContent = `<a target="_blank" href="https://onyxfixturefinder.com/fixture/${encodeURIComponent(Fixture.Manufacturer)}/${encodeURIComponent(Fixture.Model)}" />${Fixture.Model}</a>`
        break
      case 'Patch_Mode':
        RowContent = Fixture.Mode
        break
      case 'Patch_FullAddress':
        RowContent = `${NotFalse(Fixture.Universe)}.${NotFalse(Fixture.Address)}`
        break
      case 'Patch_Universe':
        RowContent = NotFalse(Fixture.Universe)
        break
      case 'Patch_Address':
        RowContent = NotFalse(Fixture.Address)
        break
      case 'Patch_Invert':
        RowContent = NotFalse(Fixture.Invert)
        break
    }
    if (TablePatch[i].RowSpan) {
      LocalRowSpan = RowSpan
    }
    Tbody += '\t' + `<td class="${ClassAttribut}"${LocalRowSpan}>${RowContent}</td>` + '\n'
  }
  Tbody += '</tr>'
  return Tbody
}
const NotFalse = val => {
  return val === false ? '' : val
}

let GroupInfo = Group => {
  if (Option.Patch.DisplaySimplifiedGroup) {
    return `#${Group.ID} ${Group.Name}`
  } else {
    return `ID: ${Group.ID}, Name: ${Group.Name}`
  }
}

let GetAllGroups = async Fixture => {
  let Groups = []
  if (Fixture.Groups) {
    for (let i = 0; i < Object.keys(Fixture.Groups).length; i++) {
      let Group = await DB.Get({ Object: 'FixtureGroup', ItemID: Fixture.Groups[i] })
      if (Group) {
        Groups.push(`<span data-title="${GroupInfo(Group)}">${Group.Name}</span>`)
      }
    }
  }
  return Groups.join(', ')
}

let Render = (PageActivation = true) => {
  return new Promise((resolve, reject) => {
    let Content = {
      thead: ComputeTHead(),
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
                Content.tbody.push(await ComputeTBodyLine(Multipart, Fixture))
                if (Fixture.Multipart) {
                  for (let i = 0; i < Multipart; ++i) {
                    let FixturePart = await DB.Get({ Object: 'Fixture', Index: 'ID', ItemID: Fixture.Multipart[i].ID })
                    FixturePart.Invert = Fixture.Invert
                    Content.tbody.push(await ComputeTBodyLine(0, FixturePart, true))
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
            if (PageActivation) {
              Display.SetLoaded('Patch')
            } else {
              // Show the Patch Group Column
              let ShowPatchGroup = document.getElementById('HideShow-Patch_Group')
              ShowPatchGroup.checked = 'checked'
              // eslint-disable-next-line no-undef
              ShowPatchGroup.dispatchEvent(new Event('change'))
            }
            Loader.Hide()
            resolve(true)
          })
      })
  })
}

module.exports = Render
