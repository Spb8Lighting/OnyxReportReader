import { Get as DbGet, GetAll as DbGetAll } from './../database'
import Config from './../config/table'
import { THead, TBodyLine } from './table'
import Menu from './menu'
import { SetLoaded as DisplaySetLoaded } from './../display'
import * as Loader from './../loader'
import { Sortable } from './tablesorter'

const Render = async (Type, SetActive = true, RenderPatch = false) => {
  // Set Parameter following the type to be displayed
  let LocalConfig = {}
  switch (Type) {
    case 'Patch':
      LocalConfig.Objects = 'Fixture'
      LocalConfig.Name = 'Patch'
      LocalConfig.ID = 'Patch'
      LocalConfig.Class = 'patch'
      LocalConfig.Table = Config.Patch
      LocalConfig.Loader = Loader.Patch
      break
    case 'Group':
      LocalConfig.Objects = 'FixtureGroup'
      LocalConfig.Name = 'Fixture Groups'
      LocalConfig.ID = 'FixtureGroup'
      LocalConfig.Class = 'fixturegroup'
      LocalConfig.Table = Config.Group
      LocalConfig.Loader = Loader.FixtureGroup
      break
    case 'Preset':
      LocalConfig.Objects = 'Preset'
      LocalConfig.Name = 'Preset'
      LocalConfig.ID = 'Preset'
      LocalConfig.Class = 'preset'
      LocalConfig.Table = Config.Preset
      LocalConfig.Loader = Loader.Preset
      break
    case 'Cuelist':
      LocalConfig.Objects = 'Cuelist'
      LocalConfig.Name = 'Cuelist'
      LocalConfig.ID = 'Cuelist'
      LocalConfig.Class = 'cuelist'
      LocalConfig.Table = Config.Cuelist
      LocalConfig.Loader = Loader.Cuelist
      break
  }
  // Define table content
  let Content = {
    thead: THead(LocalConfig.Table),
    tbody: []
  }
  // Get objects to be displayed
  let TypeObjects = await DbGetAll({ Object: LocalConfig.Objects })
  // Loop through all objects find
  for (let i = 0; i < Object.keys(TypeObjects).length; ++i) {
    // Specific Treatment for Patch
    if (Type === 'Patch') {
      let Fixture = TypeObjects[i]
      // Restrict the loop to master part, multi-part are threated inside the loop when needed
      if (/^[0-9]+$/.test(Fixture.ID)) {
        let Multipart = 0
        if (Fixture.Multipart) {
          Multipart = Object.keys(Fixture.Multipart).length
        }
        Content.tbody.push(await TBodyLine(LocalConfig.Table, Multipart, Fixture))
        // Multi Part Threatment
        if (Fixture.Multipart) {
          for (let i = 0; i < Multipart; ++i) {
            let FixturePart = await DbGet({ Object: LocalConfig.Objects, Index: 'ID', ItemID: Fixture.Multipart[i].ID })
            FixturePart.Invert = Fixture.Invert
            Content.tbody.push(await TBodyLine(LocalConfig.Table, 0, FixturePart, true))
          }
        }
      }
    } else {
      Content.tbody.push(await TBodyLine(LocalConfig.Table, 0, TypeObjects[i]))
    }
  }
  // Restrict the change of Header to the Patch only (first render)
  if (Type === 'Patch') {
    // Get Show Information
    var Show = await DbGet({ Object: 'Show', ItemID: 'Show' })
    document.querySelector('header>span').innerHTML = `Onyx Reports for "${Show.Name}" <em>(software build ${Show.Build})</em>`
  }
  // Define sub Header description
  Content.Description = `${LocalConfig.Name} summary:`
  // Manage additionnal information per type on the description
  switch (Type) {
    case 'Patch':
      Content.Description += ` <em>(${Show.FixturesCount} fixture${(Show.FixturesCount > 1) ? 's' : ''})</em>`
      break
    case 'Group':
      break
    case 'Preset':
      break
  }
  Content.Table = `<table class="${LocalConfig.Class}">` + '\n' +
    '<thead>' + '\n' +
    Content.thead + '\n' +
    '</thead>' + '\n' +
    '<tbody>' + '\n' +
    Content.tbody.join('\n') + '\n' +
    '</tbody>' + '\n' +
    '</table>'

  LocalConfig.Article = document.getElementById(LocalConfig.ID)
  // Inject Content into the dedicated Article
  LocalConfig.Article.innerHTML = `<h2>` + '\n' +
    `<button class="nav-button print_hide" type="button" role="button"><i></i></button>` + '\n' +
    ` ${LocalConfig.Name}` + '\n' +
    `</h2>` + '\n' +
    `<p>${Content.Description}</p>` + '\n' +
    `<div class="overflow">${Content.Table}</div>`
  // Add Sort function on table
  Sortable(LocalConfig.Article.querySelector('table'))
  // Add the Table menu to filter column
  Menu(LocalConfig.Table, LocalConfig.Article)
  // Set the new page content as active page
  if (SetActive || (!SetActive && !RenderPatch)) {
    DisplaySetLoaded(LocalConfig.ID, SetActive)
    if (RenderPatch) {
      await Render('Patch', false)
    }
  } else if (Type === 'Patch') {
    // Show the Patch Group Column
    let ShowPatchGroup = document.getElementById('HideShow-Patch_Group')
    ShowPatchGroup.checked = 'checked'
    // eslint-disable-next-line no-undef
    ShowPatchGroup.dispatchEvent(new Event('change'))
    Loader.FixtureGroup.Hide()
  }
  LocalConfig.Loader.Hide()
}

export default Render
