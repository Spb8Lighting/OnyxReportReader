const $Patch = document.querySelector('label[for="PatchXML"]')
const $FixtureGroup = document.querySelector('label[for="FixtureGroupXML"]')
const $Preset = document.querySelector('label[for="PresetXML"]')
const $Cuelist = document.querySelector('label[for="CuelistXML"]')

const AddLoader = Sel => Sel.classList.add('working')

const RemoveLoader = Sel => Sel.classList.remove('working')

export const Patch = {
  Show: () => AddLoader($Patch),
  Hide: () => RemoveLoader($Patch)
}
export const FixtureGroup = {
  Show: () => AddLoader($FixtureGroup),
  Hide: () => RemoveLoader($FixtureGroup)
}
export const Preset = {
  Show: () => AddLoader($Preset),
  Hide: () => RemoveLoader($Preset)
}
export const Cuelist = {
  Show: () => AddLoader($Cuelist),
  Hide: () => RemoveLoader($Cuelist)
}
