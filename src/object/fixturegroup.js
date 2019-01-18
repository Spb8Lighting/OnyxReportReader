'use strict'

class FixtureGroupObject {
  /**
   * Uploaded Fixture Group Attributs
   * @param {XMLDocument} GroupXML Complete XML file (fixture group one)
   */
  constructor (GroupXML) {
    this.ID = Number(GroupXML.getAttribute('nr'))
    this.Name = ((GroupXML.getAttribute('name') != null) ? GroupXML.getAttribute('name') : '')
    this.Fixtures = false
    this.Mask = false
    this.CheckFixtures(GroupXML)
    this.CheckMask(GroupXML)
  }
  CheckFixtures (GroupXML) {
    let Fixture = GroupXML.getElementsByTagName('Fixture')
    if (Fixture.length > 0) {
      this.Fixtures = {}
      for (let i = 0; i < Fixture.length; i++) {
        this.Fixtures[i] = Fixture[i].getAttribute('IDREF')
      }
    }
  }
  CheckMask (GroupXML) {
    let Mask = GroupXML.getElementsByTagName('Mask')[0]
    if (typeof Mask !== 'undefined') {
      this.Mask = true
    }
  }
}

module.exports = FixtureGroupObject
