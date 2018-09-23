const Option = require('./../config/option')

let FixtureObject = FixtureXML => {
    this.ID = FixtureXML.getAttribute('nr')
    this.Name = ((FixtureXML.getAttribute('name') != null) ? FixtureXML.getAttribute('name') : '')
    this.Manufacturer = FixtureXML.getAttribute('manufacturer')
    this.Model = FixtureXML.getAttribute('model')
    this.Mode = FixtureXML.getAttribute('displayName').replace(FixtureXML.getAttribute('model'), '')
    this.Invert = ''

    let DMXInfos = FixtureXML.getElementsByTagName('DMXChannel')[0]
    if (typeof DMXInfos !== 'undefined') {
        if (Option.Patch.DisplayInvertAxesIcon) {
            if (DMXInfos.getAttribute('panTiltSwapped') == 1) {
                this.Invert += '<span data-option="swap"><span>Swap</span></span>'
            }
            if (DMXInfos.getAttribute('panInverted') == -1) {
                this.Invert += '<span data-option="pan"><span>Pan</span></span>'
            }
            if (DMXInfos.getAttribute('tiltInverted') == -1) {
                this.Invert += '<span data-option="tilt"><span>Tilt</span></span>'
            }
        } else {
            if (DMXInfos.getAttribute('panInverted') == -1) {
                this.Invert += '<abbr title="Pan inverted">P</abbr>'
            }
            if (DMXInfos.getAttribute('tiltInverted') == -1) {
                this.Invert += '<abbr title="Tilt inverted">T</abbr>'
            }
            if (DMXInfos.getAttribute('panTiltSwapped') == 1) {
                this.Invert += '<abbr title="Pan/Tilt swapped">S</abbr>'
            }
        }
        this.Universe = DMXInfos.getAttribute('universe')
        this.Address = DMXInfos.getAttribute('startAddress')
    } else {
        this.Universe = ''
        this.Address = ''
        this.Invert = ''
    }
    return this
}

module.exports = FixtureObject