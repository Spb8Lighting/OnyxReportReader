import { Preset as WordingPreset } from './../config/wording'

export default class PresetObject {
  /**
   * Uploaded Preset Group Attributs
   * @param {XMLDocument} PresetXML Complete XML file (preset one)
   */
  constructor (PresetXML) {
    this.ID = PresetXML.getAttribute('ID')
    const TypePosition = this.ID.match(/^([A-Z0-9 ]+) ([0-9]+)$/i)
    this.Type = TypePosition[1]
    this.Position = TypePosition[2]
    this.Name = ((PresetXML.getAttribute('name') != null) ? PresetXML.getAttribute('name') : '')
    this.Usage = this.CheckTag('PresetUsage', 'Usage', PresetXML)
    this.UsedFor = this.CheckTag('UsedValuesFor', 'Fixture', PresetXML)
    this.UnusedFor = this.CheckTag('UnusedValuesFor', 'Fixture', PresetXML)
    this.UsePreset = this.CheckTag('PresetUsesPreset', 'Source', PresetXML, true)
    this.UsedByPreset = this.CheckTag('PresetUsedByPreset', 'Source', PresetXML, true)
    this.State = this.CheckState()
  }

  CheckState () {
    if (Object.keys(this.UsedFor).length === 0 && Object.keys(this.UnusedFor).length === 0) {
      return WordingPreset.Status.NoFixture
    } else if (Object.keys(this.UsedFor).length > 0 && Object.keys(this.UnusedFor).length === 0) {
      return WordingPreset.Status.AllUse
    } else if (Object.keys(this.UsedFor).length === 0 && Object.keys(this.UnusedFor).length > 0) {
      return WordingPreset.Status.NoUse
    } else if (Object.keys(this.UsedFor).length > 0 && Object.keys(this.UnusedFor).length > 0) {
      return WordingPreset.Status.PartialUse
    }
  }

  CheckTag (MainTag, SubTag, PresetXML, Attribute = false) {
    const TableReturn = (MainTag === 'PresetUsage') ? [] : {}
    const MainSelector = PresetXML.getElementsByTagName(MainTag)[0]
    if (typeof MainSelector !== 'undefined') {
      const SubSelectors = MainSelector.getElementsByTagName(SubTag)
      const SubSelectorsLength = SubSelectors.length
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
