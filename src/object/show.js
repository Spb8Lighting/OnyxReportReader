'use strict'
class ShowObject {
  /**
   * Return the ShowObject hydrated based on the xml file
   * @param {XMLDocument} ShowXML Original XML File (patch)
   */
  constructor (ShowXML) {
    this.Key = 'Show'
    this.Name = ShowXML.getAttribute('showName')
    this.Build = ShowXML.getAttribute('showBuild')
    this.FixturesCount = ShowXML.childElementCount
  }
}

module.exports = ShowObject
