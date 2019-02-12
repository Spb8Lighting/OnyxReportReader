import * as Option from './../config/option'

const PatchID = {
  ID: 'Patch_ID',
  Name: 'ID',
  Show: true,
  RowSpan: false,
  MultiPart: true
}
const PatchName = {
  ID: 'Patch_Name',
  Name: 'Name',
  Show: true,
  RowSpan: false,
  MultiPart: true
}
const PatchGroup = {
  ID: 'Patch_Group',
  Name: 'Group',
  Show: false,
  RowSpan: false,
  MultiPart: true
}
const PatchFixture = {
  ID: 'Patch_Fixture',
  Name: 'Fixture',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchManufacturer = {
  ID: 'Patch_Manufacturer',
  Name: 'Manufacturer',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchModel = {
  ID: 'Patch_Model',
  Name: 'Model',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchMode = {
  ID: 'Patch_Mode',
  Name: 'Mode',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchFullAddress = {
  ID: 'Patch_FullAddress',
  Name: 'Address',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchUniverse = {
  ID: 'Patch_Universe',
  Name: 'Universe',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchAddress = {
  ID: 'Patch_Address',
  Name: 'Address',
  Show: true,
  RowSpan: true,
  MultiPart: false
}
const PatchInvert = {
  ID: 'Patch_Invert',
  Name: 'Invert',
  Show: true,
  RowSpan: false,
  MultiPart: true
}
let Patch = []
Patch.push(PatchID)
Patch.push(PatchName)
Patch.push(PatchGroup)
if (Option.Patch.DisplaySimplifyFixture) {
  Patch.push(PatchFixture)
} else {
  Patch.push(PatchManufacturer)
  Patch.push(PatchModel)
  Patch.push(PatchMode)
}
if (Option.Patch.DisplaySimplifyAdress) {
  Patch.push(PatchFullAddress)
} else {
  Patch.push(PatchUniverse)
  Patch.push(PatchAddress)
}
Patch.push(PatchInvert)

const GroupID = {
  ID: 'Group_ID',
  Name: 'ID',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const GroupName = {
  ID: 'Group_Name',
  Name: 'Name',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const GroupMask = {
  ID: 'Group_Mask',
  Name: 'Group',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const GroupFixture = {
  ID: 'Group_Fixtures',
  Name: 'Fixture',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
let Group = []
Group.push(GroupID)
Group.push(GroupName)
if (!Option.Group.HideAutoGroup) {
  Group.push(GroupMask)
}
Group.push(GroupFixture)

const PresetType = {
  ID: 'Preset_Type',
  Name: 'Type',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetPosition = {
  ID: 'Preset_Position',
  Name: 'N°',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetName = {
  ID: 'Preset_Name',
  Name: 'Name',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetState = {
  ID: 'Preset_State',
  Name: 'State',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetUsage = {
  ID: 'Preset_Usage',
  Name: 'Usage',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetFixtures = {
  ID: 'Preset_Fixtures',
  Name: 'Fixture usage',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetUsedBy = {
  ID: 'Preset_UsedBy',
  Name: 'Used By',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetUnUsedBy = {
  ID: 'Preset_UnUsedBy',
  Name: 'Never used by',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetReferal = {
  ID: 'Preset_Referal',
  Name: 'Refers to',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const PresetEmbedded = {
  ID: 'Preset_Embedded',
  Name: 'Embedded in',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
let Preset = []
Preset.push(PresetPosition)
Preset.push(PresetType)
Preset.push(PresetName)
Preset.push(PresetState)
if (Option.Preset.DisplayMergedFixturePerPreset) {
  Preset.push(PresetFixtures)
}
Preset.push(PresetUsage)
Preset.push(PresetUsedBy)
Preset.push(PresetUnUsedBy)
Preset.push(PresetReferal)
Preset.push(PresetEmbedded)

const CuelistID = {
  ID: 'Cuelist_ID',
  Name: 'ID',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistType = {
  ID: 'Cuelist_Type',
  Name: 'Type',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistName = {
  ID: 'Cuelist_Name',
  Name: 'Name',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistCueNumber = {
  ID: 'Cuelist_CueNumber',
  Name: 'Cue(s)',
  Show: true,
  RowSpan: false,
  MultiPart: false
}

let Cuelist = []
Cuelist.push(CuelistID)
Cuelist.push(CuelistType)
Cuelist.push(CuelistName)
Cuelist.push(CuelistCueNumber)

const CuelistDetailID = {
  ID: 'Cuelist_DetailID',
  Name: '#',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailCue = {
  ID: 'Cuelist_DetailCue',
  Name: 'Cue',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailTrigger = {
  ID: 'Cuelist_DetailTrigger',
  Name: 'Trigger',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailTime = {
  ID: 'Cuelist_DetailTime',
  Name: 'Time',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailDelay = {
  ID: 'Cuelist_DetailDelay',
  Name: 'Delay',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailFade = {
  ID: 'Cuelist_DetailFade',
  Name: 'Fade',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailFadeMode = {
  ID: 'Cuelist_DetailFadeMode',
  Name: 'Fade Mode',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailUses = {
  ID: 'Cuelist_DetailUses',
  Name: 'Uses',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
const CuelistDetailComment = {
  ID: 'Cuelist_DetailComment',
  Name: 'Comment',
  Show: true,
  RowSpan: false,
  MultiPart: false
}
let CuelistStandard = []
CuelistStandard.push(CuelistDetailID)
CuelistStandard.push(CuelistDetailCue)
CuelistStandard.push(CuelistDetailTrigger)
CuelistStandard.push(CuelistDetailDelay)
CuelistStandard.push(CuelistDetailFade)
CuelistStandard.push(CuelistDetailFadeMode)
CuelistStandard.push(CuelistDetailUses)
CuelistStandard.push(CuelistDetailComment)

let CuelistTimecode = []
CuelistTimecode.push(CuelistDetailID)
CuelistTimecode.push(CuelistDetailCue)
CuelistTimecode.push(CuelistDetailTrigger)
CuelistTimecode.push(CuelistDetailTime)
CuelistTimecode.push(CuelistDetailDelay)
CuelistTimecode.push(CuelistDetailFade)
CuelistTimecode.push(CuelistDetailFadeMode)
CuelistTimecode.push(CuelistDetailUses)
CuelistTimecode.push(CuelistDetailComment)

let CuelistChase = []
CuelistChase.push(CuelistDetailID)
CuelistChase.push(CuelistDetailCue)
CuelistChase.push(CuelistDetailFadeMode)
CuelistChase.push(CuelistDetailUses)
CuelistChase.push(CuelistDetailComment)

let CuelistOverride = []
CuelistOverride.push(CuelistDetailID)
CuelistOverride.push(CuelistDetailCue)
CuelistOverride.push(CuelistDetailFadeMode)
CuelistOverride.push(CuelistDetailUses)
CuelistOverride.push(CuelistDetailComment)

let CuelistGroupMaster = []
CuelistGroupMaster.push(CuelistDetailID)
CuelistGroupMaster.push(CuelistDetailCue)
CuelistGroupMaster.push(CuelistDetailUses)
CuelistGroupMaster.push(CuelistDetailComment)

export default {
  Patch, Group, Preset, Cuelist, CuelistStandard, CuelistChase, CuelistOverride, CuelistGroupMaster, CuelistTimecode
}
