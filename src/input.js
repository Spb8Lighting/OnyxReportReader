import Message from './message'
import Config from './config/type'
import Wording from './config/wording'
import DB from './database'
import Parser from './parser'
import $File from './object/file'
import Loader from './loader'
import Render from './function/render'

export default async () => {
  // ########################
  //   Form Configuration
  // ########################
  let Labels = document.querySelectorAll('aside label')

  for (let i = 0; i < Labels.length; ++i) {
    let Label = Labels[i]
    let LabelFor = Label.getAttribute('for')
    let LabelName = Config[LabelFor].Name
    let LabelPicture = Config[LabelFor].Picture
    let LabelExt = Config[LabelFor].FileExt
    let InputMatchRegex = Config[LabelFor].Regex
    let ActicleID = LabelFor.slice(0, -3)

    // Label display
    Label.innerHTML = `<span>${LabelName}</span>${LabelPicture}<input type="file" name="${LabelFor}" id="${LabelFor}" accept="${LabelExt}" />`

    let Input = document.getElementById(LabelFor)

    Input.addEventListener('dragover', e => e.target.parentNode.classList.add('dragover'))
    Input.addEventListener('dragleave', e => e.target.parentNode.classList.remove('dragover'))
    Input.addEventListener('drop', e => e.target.parentNode.classList.remove('dragover'))

    // Input listeners for XML upload
    Input.addEventListener('change', e => {
      Loader[e.target.id.slice(0, -3)].Show()
      let UploadedFile = e.target.files[0]
      if (typeof UploadedFile.name !== 'undefined') {
        if (UploadedFile.name.search(InputMatchRegex) === -1) {
          Message({ error: `<em>File selected: ${UploadedFile.name}</em><br />${Wording.Error.File.Extension} <strong>${LabelExt}</strong>` })
          Loader.Hide()
        } else {
          let reader = new FileReader()
          let parser = new DOMParser()
          let xmlDoc
          reader.addEventListener('load', async e => {
            xmlDoc = parser.parseFromString(e.target.result, 'text/xml')
            switch (ActicleID) {
              case 'Patch':
                Parser.Patch(xmlDoc)
                Render('Patch', true)
                break
              case 'FixtureGroup':
                await Parser.FixtureGroup(xmlDoc)
                Render('Group', true, true)
                break
              case 'Preset':
                await Parser.Preset(xmlDoc)
                Render('Preset', true)
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
