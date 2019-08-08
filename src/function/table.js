import { Get as DbGet } from './../database'
import * as Option from './../config/option'
import { Preset as WordingPreset } from './../config/wording'
import Common from './common'

export const FixtureInfo = FixtureDB => {
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

const GroupInfo = Group => {
  if (Option.Patch.DisplaySimplifiedGroup) {
    return `#${Group.ID} ${Group.Name}`
  } else {
    return `ID: ${Group.ID}, Name: ${Group.Name}`
  }
}

const PresetInfo = Preset => {
  if (Option.Preset.DisplaySimplifiedPreset) {
    return `#${Preset.ID} ${Preset.Name}`
  } else {
    return `Type: ${Preset.Type}, ID: ${Preset.Position}, Name: ${Preset.Name}`
  }
}

const GetAllFixtures = async (ListOfFixtures, index = false) => {
  let Fixtures = 0
  const FixtureList = []
  if (ListOfFixtures) {
    Fixtures = Object.keys(ListOfFixtures).length
  }
  if (Fixtures > 0) {
    for (let i = 0; i < Fixtures; ++i) {
      const Fixture = ListOfFixtures[i]
      const FixtureDB = await DbGet({ Object: 'Fixture', Index: (index) ? 'ID' : 'Ref', ItemID: Fixture })
      if (FixtureDB) {
        FixtureList.push(`<span data-title="${FixtureInfo(FixtureDB)}">${FixtureDB.ID}</span>`)
      }
    }
    return FixtureList.join(', ')
  } else {
    return false
  }
}

const GetAllPresets = async (ListOfPresets) => {
  let Presets = 0
  const PresetList = []
  if (ListOfPresets) {
    Presets = Object.keys(ListOfPresets).length
  }
  if (Presets > 0) {
    for (let i = 0; i < Presets; ++i) {
      const Preset = ListOfPresets[i]
      const PresetDB = await DbGet({ Object: 'Preset', Index: 'ID', ItemID: Preset })
      if (PresetDB) {
        PresetList.push(`<span data-title="${PresetInfo(PresetDB)}">${PresetDB.Name}</span>`)
      }
    }
    return PresetList.join(', ')
  } else {
    return false
  }
}

const GetAllGroups = async Fixture => {
  const Groups = []
  if (Fixture.Groups) {
    for (let i = 0; i < Object.keys(Fixture.Groups).length; i++) {
      const Group = await DbGet({ Object: 'FixtureGroup', ItemID: Fixture.Groups[i] })
      if (Group) {
        Groups.push(`<span data-title="${GroupInfo(Group)}">${Group.Name}</span>`)
      }
    }
    return Groups.join(', ')
  } else {
    return false
  }
}

const NotFalse = (val, join = false) => {
  return val === false ? '' : (join) ? val.join(join) : val
}

export const THead = Config => {
  let Thead = '<tr>' + '\n'
  const TheadLength = Config.length
  for (let i = 0; i < TheadLength; ++i) {
    const ClassAttribut = Config[i].Show ? Config[i].ID : `${Config[i].ID} hide`
    Thead += '\t' + `<th class="${ClassAttribut}">${Config[i].Name}</th>` + '\n'
  }
  Thead += '</tr>'
  return Thead
}
const PresetState = val => {
  switch (val) {
    case WordingPreset.Status.AllUse:
      return `<span class="success">${val}</span>`
    case WordingPreset.Status.PartialUse:
      return `<span class="primary">${val}</span>`
    case WordingPreset.Status.NoUse:
      return `<span class="warning">${val}</span>`
    case WordingPreset.Status.NoFixture:
      return `<span class="danger">${val}</span>`
    default:
      return val
  }
}

const PresetType = val => {
  if (typeof val === 'string') {
    if (Option.Preset.DisplayIconForPresetTypeAndUsage) {
      let CssClass = ''
      switch (val) {
        case 'Intensity':
          CssClass = 'Intensity'
          break
        case 'Pan Tilt':
          CssClass = 'Pan'
          break
        case 'Color':
          CssClass = 'Color'
          break
        case 'Gobo':
          CssClass = 'Wheel'
          break
        case 'Beam':
          CssClass = 'Prism'
          break
        case 'Beam Effects':
          CssClass = 'Iris'
          break
        case 'Special':
          CssClass = 'Fx'
          break
        default:
          break
      }
      return `<span data-title="${val}" class="Icon ${CssClass}"></span>`
    } else {
      return val
    }
  } else if (typeof val === 'object') {
    const Temp = []
    for (let i = 0; i < val.length; i++) {
      Temp.push(PresetType(val[i]))
    }
    return Temp.join((Option.Preset.DisplayIconForPresetTypeAndUsage) ? '' : ', ')
  } else {
    return ''
  }
}

export const TBodyLine = async (Config, Multipart, Data, Restricted = false) => {
  const MultiPartClass = Restricted ? 'Patch_MultiPart' : 'MultiPart'
  const MultiPartID = Multipart > 0 || Restricted ? ` class="${MultiPartClass}" data-id="${Data.ID}"` : ''
  let Tbody = `<tr${MultiPartID}>` + '\n'
  const Table = Config
  const TbodyLength = Table.length
  for (let i = 0; i < TbodyLength; ++i) {
    let ClassAttribut = Table[i].Show ? Table[i].ID : `${Table[i].ID} hide`
    let RowContent = ''
    switch (Table[i].ID) {
      case 'Patch_ID':
      case 'Group_ID':
      case 'Cuelist_ID':
        RowContent = Data.ID
        break
      case 'Group_Name':
      case 'Patch_Name':
      case 'Preset_Name':
        RowContent = NotFalse(Data.Name)
        break
      case 'Group_Fixtures':
        RowContent = NotFalse(await GetAllFixtures(Data.Fixtures))
        break
      case 'Group_Mask':
        RowContent = Data.Mask ? 'True' : ''
        break
      case 'Patch_Group':
        RowContent = NotFalse(await GetAllGroups(Data))
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
      case 'Preset_State':
        // NotFalse function added for compatibility reason (until preset report are uploaded again)
        RowContent = NotFalse(PresetState(Data.State))
        break
      case 'Preset_Type':
        RowContent = PresetType(Data.Type)
        break
      case 'Cuelist_Type':
        RowContent = `<span class="square Type-${Data.Type}"></span> ${Data.Type}`
        break
      case 'Preset_Position':
        RowContent = Data.Position
        break
      case 'Preset_Usage':
        RowContent = PresetType(Data.Usage)
        break
      case 'Preset_Fixtures':
        const Fixtures = Common.AssignObject(Data.UsedFor, Data.UnusedFor)
        if (Fixtures) {
          RowContent = NotFalse(await GetAllFixtures(Fixtures, true))
        } else {
          RowContent = ''
        }
        break
      case 'Preset_UsedBy':
        RowContent = NotFalse(await GetAllFixtures(Data.UsedFor, true))
        break
      case 'Preset_UnUsedBy':
        RowContent = NotFalse(await GetAllFixtures(Data.UnusedFor, true))
        break
      case 'Preset_Referal':
        RowContent = NotFalse(await GetAllPresets(Data.UsePreset))
        break
      case 'Preset_Embedded':
        RowContent = NotFalse(await GetAllPresets(Data.UsedByPreset))
        break
      case 'Cuelist_Name':
        RowContent = `<a href="#Cuelist-${Data.ID}">${NotFalse(Data.Name)}</a>`
        break
      case 'Cuelist_CueNumber':
        RowContent = Data.Cues.length
        break
      case 'Cuelist_DetailID':
        RowContent = Data.ID
        break
      case 'Cuelist_DetailCue':
        RowContent = NotFalse(Data.Name)
        break
      case 'Cuelist_DetailTrigger':
        RowContent = NotFalse(Data.Trigger)
        break
      case 'Cuelist_DetailDelay':
        RowContent = NotFalse(Data.Delay)
        break
      case 'Cuelist_DetailFade':
        RowContent = NotFalse(Data.Fade)
        break
      case 'Cuelist_DetailFadeMode':
        RowContent = NotFalse(Data.FadeMode)
        break
      case 'Cuelist_DetailUses':
        const RowC = []
        if (Data.MarkCue) {
          RowC.push('M')
        }
        if (Option.Cuelist.DisplayUsage) {
          if (Data.UsesBase) {
            RowC.push('B')
          }
          if (Data.UsesFx) {
            RowC.push('FX')
          }
          if (Data.UsesTiming) {
            RowC.push('T')
          }
        }
        RowContent = (RowC.length > 0) ? RowC.join(', ') : ''
        break
      case 'CuelistDetailComment':
        RowContent = NotFalse(Data.Comment)
        break
      case 'Cuelist_DetailTime':
        RowContent = NotFalse(Data.TimeCode)
    }
    // Empty cell content for multipart Fixture
    if (Restricted) {
      RowContent = (!Table[i].MultiPart) ? '' : RowContent
      ClassAttribut += (!Table[i].MultiPart) ? ' rowspan' : ''
    }
    Tbody += '\t' + `<td class="${ClassAttribut}">${RowContent}</td>` + '\n'
  }
  Tbody += '</tr>'
  return Tbody
}
