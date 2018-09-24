const Option = require('./../config/option')

let SubFixtureObject = PartXML => {
    this.ID = Number(PartXML.getAttribute('nr'))
    this.Ref = PartXML.getAttribute('ID')
    this.Name = ((PartXML.getAttribute('name') != null) ? PartXML.getAttribute('name') : '')
    return this
}

let FixtureObject = FixtureXML => {
    let FixtureID = Number(FixtureXML.getAttribute('nr'))
    this.Multipart = false

    let Parts = FixtureXML.getElementsByTagName('Part')

    if (Parts.length > 0) {
        this.Multipart = {}
        for (let i = 0; i < Parts.length; i++) {
            this.Multipart[i] = JSON.parse(JSON.stringify(new SubFixtureObject(Parts[i])))
        }
    }

    this.ID = FixtureID
    this.Ref = FixtureXML.getAttribute('ID')
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
        this.Universe = Number(DMXInfos.getAttribute('universe'))
        this.Address = Number(DMXInfos.getAttribute('startAddress'))
    } else {
        this.Universe = ''
        this.Address = ''
        this.Invert = ''
    }
    return this
}

module.exports = FixtureObject