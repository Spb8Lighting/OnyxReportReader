'use scrict'
const Option = require('./../config/option')

class SubFixtureObject {
  /**
   * Sub Fixture Object, for the multipart
   * @param {XMLDocument} PartXML Partial XML object where multipart are present
   */
  constructor (PartXML) {
    this.ID = Number(PartXML.getAttribute('nr'))
    this.Ref = PartXML.getAttribute('id')
    this.Name = ((PartXML.getAttribute('name') != null) ? PartXML.getAttribute('name') : '')
  }
}

class FixtureObject {
  /**
   * Create a Fixture Object
   * @param {XMLDocument} FixtureXML Complete XML file (patch one)
   */
  constructor (FixtureXML) {
    this.ID = Number(FixtureXML.getAttribute('nr'))
    this.Ref = FixtureXML.getAttribute('ID')
    this.Name = ((FixtureXML.getAttribute('name') != null) ? FixtureXML.getAttribute('name') : '')
    this.Manufacturer = FixtureXML.getAttribute('manufacturer')
    this.Model = FixtureXML.getAttribute('model')
    this.Mode = FixtureXML.getAttribute('displayName').replace(this.Model, '')
    this.Invert = false
    this.Universe = false
    this.Address = false
    this.CheckMultipart(FixtureXML)
    this.CheckDMXInfos(FixtureXML)
  }
  CheckMultipart (FixtureXML) {
    let Parts = FixtureXML.getElementsByTagName('Part')
    if (Parts.length > 0) {
      this.Multipart = {}
      for (let i = 0; i < Parts.length; i++) {
        this.Multipart[i] = JSON.parse(JSON.stringify(new SubFixtureObject(Parts[i])))
      }
    } else {
      this.Multipart = false
    }
  }
  CheckDMXInfos (FixtureXML) {
    let DMXInfos = FixtureXML.getElementsByTagName('DMXChannel')[0]
    if (typeof DMXInfos !== 'undefined') {
      if (Option.Patch.DisplayInvertAxesIcon) {
        if (DMXInfos.getAttribute('panTiltSwapped') === 1) {
          this.Invert += '<span data-option="swap"><span>Swap</span></span>'
        }
        if (DMXInfos.getAttribute('panInverted') === -1) {
          this.Invert += '<span data-option="pan"><span>Pan</span></span>'
        }
        if (DMXInfos.getAttribute('tiltInverted') === -1) {
          this.Invert += '<span data-option="tilt"><span>Tilt</span></span>'
        }
      } else {
        if (DMXInfos.getAttribute('panInverted') === -1) {
          this.Invert += '<abbr title="Pan inverted">P</abbr>'
        }
        if (DMXInfos.getAttribute('tiltInverted') === -1) {
          this.Invert += '<abbr title="Tilt inverted">T</abbr>'
        }
        if (DMXInfos.getAttribute('panTiltSwapped') === 1) {
          this.Invert += '<abbr title="Pan/Tilt swapped">S</abbr>'
        }
      }
      this.Universe = Number(DMXInfos.getAttribute('universe'))
      this.Address = Number(DMXInfos.getAttribute('startAddress'))
    }
  }
}

module.exports = FixtureObject
