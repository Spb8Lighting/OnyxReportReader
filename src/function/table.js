'use strict'
const DB = require('./../database')
const Option = require('./../config/option')

let GroupInfo = Group => {
  if (Option.Patch.DisplaySimplifiedGroup) {
    return `#${Group.ID} ${Group.Name}`
  } else {
    return `ID: ${Group.ID}, Name: ${Group.Name}`
  }
}

const GetAllGroups = async Fixture => {
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

const NotFalse = val => {
  return val === false ? '' : val
}

const THead = Config => {
  let Thead = '<tr>' + '\n'
  let TheadLength = Config.length
  for (let i = 0; i < TheadLength; ++i) {
    let ClassAttribut = Config[i].Hide ? `${Config[i].ID} hide` : Config[i].ID
    Thead += '\t' + `<th class="${ClassAttribut}">${Config[i].Name}</th>` + '\n'
  }
  Thead += '</tr>'
  return Thead
}

const TBodyLine = async (Config, Multipart, Data, Restricted = false) => {
  let MultiPartClass = Restricted ? 'Patch_MultiPart' : 'MultiPart'
  let MultiPartID = Multipart > 0 || Restricted ? ` class="${MultiPartClass}" data-id="${Data.ID}"` : ''
  let RowSpanCount = Multipart + 1
  let RowSpan = Multipart > 0 ? ` data-rowspan="${RowSpanCount}" rowspan="${RowSpanCount}"` : ''
  let Tbody = `<tr${MultiPartID}>` + '\n'
  let Table = Config
  let TbodyLength = Table.length
  if (Restricted) {
    Table = []
    for (let i = 0; i < TbodyLength; ++i) {
      if (Config[i].MultiPart) {
        Table.push(Config[i])
      }
    }
    TbodyLength = Table.length
  }
  for (let i = 0; i < TbodyLength; ++i) {
    let ClassAttribut = Table[i].Hide ? `${Table[i].ID} hide` : Table[i].ID
    let RowContent = ''
    let LocalRowSpan = ''
    switch (Table[i].ID) {
      case 'Patch_ID':
      case 'Group_ID':
        RowContent = Data.ID
        break
      case 'Group_Name':
      case 'Patch_Name':
        RowContent = NotFalse(Data.Name)
        break
      case 'Group_Fixtures':
        RowContent = Data.Fixtures.join(', ')
        break
      case 'Group_Mask':
        RowContent = Data.Mask ? 'True' : ''
        break
      case 'Patch_Group':
        RowContent = await GetAllGroups(Data)
        break
      case 'Patch_Fixture':
        RowContent = `<a target="_blank" href="https://onyxfixturefinder.com/fixture/${encodeURIComponent(Data.Manufacturer)}/${encodeURIComponent(Data.Model)}" />${Data.Manufacturer} - ${Data.Model}</a> <em>(${Data.Mode})</em>`
        break
      case 'Patch_Manufacturer':
        RowContent = `<a target="_blank" href="https://onyxfixturefinder.com/#SearchMode=live&amp;DisplayMode=1&amp;Manufacturer=${encodeURIComponent(Data.Manufacturer)}" />${Data.Manufacturer}</a>`
        break
      case 'Patch_Model':
        RowContent = `<a target="_blank" href="https://onyxfixturefinder.com/fixture/${encodeURIComponent(Data.Manufacturer)}/${encodeURIComponent(Data.Model)}" />${Data.Model}</a>`
        break
      case 'Patch_Mode':
        RowContent = Data.Mode
        break
      case 'Patch_FullAddress':
        RowContent = `${NotFalse(Data.Universe)}.${NotFalse(Data.Address)}`
        break
      case 'Patch_Universe':
        RowContent = NotFalse(Data.Universe)
        break
      case 'Patch_Address':
        RowContent = NotFalse(Data.Address)
        break
      case 'Patch_Invert':
        RowContent = NotFalse(Data.Invert)
        break
    }
    if (Table[i].RowSpan) {
      LocalRowSpan = RowSpan
    }
    Tbody += '\t' + `<td class="${ClassAttribut}"${LocalRowSpan}>${RowContent}</td>` + '\n'
  }
  Tbody += '</tr>'
  return Tbody
}

module.exports = {
  THead,
  TBodyLine
}
