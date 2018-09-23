let ShowObject = ShowXML => {
    this.Name = ShowXML.getAttribute('showName')
    this.Build = ShowXML.getAttribute('showBuild')
    this.FixturesCount = ShowXML.childElementCount
    return this
}

module.exports = ShowObject