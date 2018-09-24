let FileObject = UploadedFile => {
    this.Key = UploadedFile.Key
    this.Name = UploadedFile.name
    this.LastModified = UploadedFile.lastModified
    this.Type = UploadedFile.type
    this.Size = UploadedFile.size
    return this
}

module.exports = FileObject