export default class FileObject {
  /**
   * Uploaded File Attributs
   * @param {object} Attributs Uploaded File object
   */
  constructor (Attributs) {
    this.Key = Attributs.Key
    this.Name = Attributs.name
    this.LastModified = Attributs.lastModified
    this.Type = Attributs.type
    this.Size = Attributs.size
  }
}
