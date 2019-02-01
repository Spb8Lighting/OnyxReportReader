'use scrict'
const DB = require('./../database')

class CueObject {
  /**
   * Cue Object
   * @param {XMLDocument} CuelistXML Partial XML object where multipart are present
   */
  constructor (PartXML) {
  }
}

class CuelistObject {
  /**
   * Create a Cuelist Object
   * @param {XMLDocument} CuelistXML Complete XML file (patch one)
   */
  constructor (CuelistXML) {
    console.log(CuelistXML)
    this.ID = Number(CuelistXML.getAttribute('visualId'))
    this.Name = CuelistXML.getAttribute('cuelistName')
    this.Type = CuelistXML.nodeName
    this.Physical = false
    this.Bank = false
  }
}

module.exports = CuelistObject
