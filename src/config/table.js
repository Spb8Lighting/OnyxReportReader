const Option = require('./../config/option')

const PatchID = {
  ID: 'Patch_ID',
  Name: 'ID',
  Hide: false,
  RowSpan: false,
  MultiPart: true
}
const PatchName = {
  ID: 'Patch_Name',
  Name: 'Name',
  Hide: false,
  RowSpan: false,
  MultiPart: true
}
const PatchGroup = {
  ID: 'Patch_Group',
  Name: 'Group',
  Hide: true,
  RowSpan: false,
  MultiPart: true
}
const PatchFixture = {
  ID: 'Patch_Fixture',
  Name: 'Fixture',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchManufacturer = {
  ID: 'Patch_Manufacturer',
  Name: 'Manufacturer',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchModel = {
  ID: 'Patch_Model',
  Name: 'Model',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchMode = {
  ID: 'Patch_Mode',
  Name: 'Mode',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchFullAddress = {
  ID: 'Patch_FullAddress',
  Name: 'Address',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchUniverse = {
  ID: 'Patch_Universe',
  Name: 'Universe',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchAddress = {
  ID: 'Patch_Address',
  Name: 'Address',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const PatchInvert = {
  ID: 'Patch_Invert',
  Name: 'Invert',
  Hide: false,
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
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const GroupName = {
  ID: 'Group_Name',
  Name: 'Name',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const GroupMask = {
  ID: 'Group_Mask',
  Name: 'Group',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const GroupFixture = {
  ID: 'Group_Fixtures',
  Name: 'Fixture',
  Hide: false,
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
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetPosition = {
  ID: 'Preset_Position',
  Name: 'N°',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetName = {
  ID: 'Preset_Name',
  Name: 'Name',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetUsage = {
  ID: 'Preset_Usage',
  Name: 'Usage',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetUsedBy = {
  ID: 'Preset_UsedBy',
  Name: 'Used By',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetUnUsedBy = {
  ID: 'Preset_UnUsedBy',
  Name: 'Never used by',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetReferal = {
  ID: 'Preset_Referal',
  Name: 'Refers to',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
const PresetEmbedded = {
  ID: 'Preset_Embedded',
  Name: 'Embedded in',
  Hide: false,
  RowSpan: false,
  MultiPart: false
}
let Preset = []
Preset.push(PresetType)
Preset.push(PresetPosition)
Preset.push(PresetName)
Preset.push(PresetUsage)
Preset.push(PresetUsedBy)
Preset.push(PresetUnUsedBy)
Preset.push(PresetReferal)
Preset.push(PresetEmbedded)

module.exports = {
  Patch, Group, Preset
}
