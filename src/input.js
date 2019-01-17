import Message from './message'
import Config from './config/type'
import Wording from './config/wording'
import DB from './database'
import Parser from './parser'
import $File from './object/file'

export default () => {
  // ########################
  //   Form Configuration
  // ########################
  let Labels = document.querySelectorAll('label')

  for (let i = 0; i < Labels.length; ++i) {
    let Label = Labels[i]
    let LabelFor = Label.getAttribute('for')
    let LabelName = Config[LabelFor].Name
    let LabelPicture = Config[LabelFor].Picture
    let LabelExt = Config[LabelFor].FileExt
    let InputMatchRegex = Config[LabelFor].Regex
    let ActicleID = LabelFor.slice(0, -3)

    // Label display
    Label.innerHTML = `<span class="w100p txtcenter">${LabelName}</span>${LabelPicture}<input type="file" name="${LabelFor}" id="${LabelFor}" accept="${LabelExt}" />`

    let Input = document.getElementById(LabelFor)

    Input.addEventListener('dragover', e => {
      Input.parentNode.classList.add('dragover')
    })
    Input.addEventListener('dragleave', e => {
      Input.parentNode.classList.remove('dragover')
    })
    Input.addEventListener('drop', e => {
      Input.parentNode.classList.remove('dragover')
    })

    // Input listeners for XML upload
    Input.addEventListener('change', () => {
      let UploadedFile = Input.files[0]
      if (typeof UploadedFile.name !== 'undefined') {
        if (UploadedFile.name.search(InputMatchRegex) === -1) {
          Message({ error: `<em>File selected: ${UploadedFile.name}</em><br />${Wording.Error.File.Extension} <strong>${LabelExt}</strong>` })
        } else {
          let reader = new FileReader()
          let parser = new DOMParser()
          let xmlDoc
          reader.addEventListener('load', e => {
            xmlDoc = parser.parseFromString(e.target.result, 'text/xml')
            switch (ActicleID) {
              case 'Patch':
                Parser.Patch(xmlDoc)
                require('./render/patch')()
                break
              case 'FixtureGroup':
                Parser.FixtureGroup(xmlDoc)
                require('./render/group')()
                break
              default:
                break
            }
            UploadedFile.Key = ActicleID
            DB.Add({
              Object: 'File',
              Item: new $File(UploadedFile)
            })
            Message({ ok: `<em>File selected: ${UploadedFile.name}</em><br />${Wording.Ok.File.Loaded}` })
            reader = false
            xmlDoc = false
          })
          reader.readAsText(UploadedFile)
        }
      }
    })
  }
}
