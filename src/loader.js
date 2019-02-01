'use strict'
const $Patch = document.querySelector('label[for="PatchXML"]')
const $FixtureGroup = document.querySelector('label[for="FixtureGroupXML"]')
const $Preset = document.querySelector('label[for="PresetXML"]')
const $Cuelist = document.querySelector('label[for="CuelistXML"]')

let AddLoader = Sel => Sel.classList.add('working')

let RemoveLoader = Sel => Sel.classList.remove('working')

let Patch = {
  Show: () => AddLoader($Patch),
  Hide: () => RemoveLoader($Patch)
}
let FixtureGroup = {
  Show: () => AddLoader($FixtureGroup),
  Hide: () => RemoveLoader($FixtureGroup)
}
let Preset = {
  Show: () => AddLoader($Preset),
  Hide: () => RemoveLoader($Preset)
}
let Cuelist = {
  Show: () => AddLoader($Cuelist),
  Hide: () => RemoveLoader($Cuelist)
}

module.exports = {
  Patch, FixtureGroup, Preset, Cuelist
}
