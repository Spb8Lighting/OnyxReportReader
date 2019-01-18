'use strict'

class PresetObject {
  /**
   * Uploaded Preset Group Attributs
   * @param {XMLDocument} PresetXML Complete XML file (preset one)
   */
  constructor (PresetXML) {
    this.ID = PresetXML.getAttribute('ID')
    this.Name = ((PresetXML.getAttribute('name') != null) ? PresetXML.getAttribute('name') : '')
    this.Usage = false
    this.UsedFor = false
    this.UnusedFor = false
    this.UsePreset = false
    this.UsedByPreset = false
  }
  CheckUsage (PresetXML) {
    let Mask = PresetXML.getElementsByTagName('PresetUsage')[0]
    if (typeof Mask !== 'undefined') {
      this.Mask = true
    }
  }
}

module.exports = PresetObject
