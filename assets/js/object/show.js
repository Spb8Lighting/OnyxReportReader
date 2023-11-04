export default class ShowObject {
  /**
   * Return the ShowObject hydrated based on the xml file
   * @param {XMLDocument} ShowXML Original XML File (patch)
   */
  constructor (ShowXML) {
    this.Key = 'Show'
    this.Name = ShowXML.getAttribute('showName')
    this.Build = ShowXML.getAttribute('showBuild')
    if (this.Build > 65535) {
      this.Build = `${(this.Build - (this.Build % 16777216)) / 16777216}.${((this.Build - (this.Build % 65536)) / 65536) % 256}.${this.Build % 65536}`
    }
    this.FixturesCount = ShowXML.childElementCount
  }
}
