'use strict'

class PresetObject {
  /**
   * Uploaded Preset Group Attributs
   * @param {XMLDocument} PresetXML Complete XML file (preset one)
   */
  constructor (PresetXML) {
    this.ID = PresetXML.getAttribute('ID')
    let TypePosition = this.ID.match(/^([A-Z0-9 ]+) ([0-9]+)$/i)
    this.Type = TypePosition[1]
    this.Position = TypePosition[2]
    this.Name = ((PresetXML.getAttribute('name') != null) ? PresetXML.getAttribute('name') : '')
    this.Usage = this.CheckTag('PresetUsage', 'Usage', PresetXML)
    this.UsedFor = this.CheckTag('UsedValuesFor', 'Fixture', PresetXML)
    this.UnusedFor = this.CheckTag('UnusedValuesFor', 'Fixture', PresetXML)
    this.UsePreset = this.CheckTag('PresetUsesPreset', 'Source', PresetXML, true)
    this.UsedByPreset = this.CheckTag('PresetUsedByPreset', 'Source', PresetXML, true)
  }
  CheckTag (MainTag, SubTag, PresetXML, Attribute = false) {
    let TableReturn = (MainTag === 'PresetUsage') ? [] : {}
    let MainSelector = PresetXML.getElementsByTagName(MainTag)[0]
    if (typeof MainSelector !== 'undefined') {
      let SubSelectors = MainSelector.getElementsByTagName(SubTag)
      let SubSelectorsLength = SubSelectors.length
      if (SubSelectorsLength > 0) {
        for (let i = 0; i < SubSelectorsLength; i++) {
          if (Attribute) {
            TableReturn[i] = `${SubSelectors[i].getAttribute('group')} ${SubSelectors[i].getAttribute('id')}`
          } else {
            TableReturn[i] = (MainTag === 'PresetUsage') ? SubSelectors[i].innerHTML : Number(SubSelectors[i].innerHTML)
          }
        }
        return TableReturn
      } else {
        return false
      }
    }
  }
}

module.exports = PresetObject
