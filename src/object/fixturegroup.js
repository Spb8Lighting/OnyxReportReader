'use strict'

class FixtureGroupObject {
  /**
   * Uploaded Fixture Group Attributs
   * @param {XMLDocument} GroupXML Complete XML file (patch one)
   */
  constructor (GroupXML) {
    this.ID = Number(GroupXML.getAttribute('nr'))
    this.Name = ((GroupXML.getAttribute('name') != null) ? GroupXML.getAttribute('name') : '')
    this.Mask = false
    this.CheckMask(GroupXML)
  }
  CheckMask (GroupXML) {
    let Mask = GroupXML.getElementsByTagName('Mask')[0]
    if (typeof Mask !== 'undefined') {
      this.Mask = true
    }
  }
}

module.exports = FixtureGroupObject
