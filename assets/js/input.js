import Message from './message.js'
import * as Config from './config/type.js'
import { Error as WordingError, Ok as WordingOk } from './config/wording.js'
import { Add as DbAdd } from './database.js'
import * as Parser from './parser.js'
import $File from './object/file.js'
import * as Loader from './loader.js'
import Render from './function/render.js'

export default async () => {
  // ########################
  //   Form Configuration
  // ########################
  const Labels = document.querySelectorAll('aside fieldset:not(.hide) label')

  for (let i = 0; i < Labels.length; ++i) {
    const Label = Labels[i]
    const LabelFor = Label.getAttribute('for')
    const LabelName = Config[LabelFor].Name
    const LabelPicture = Config[LabelFor].Picture
    const LabelExt = Config[LabelFor].FileExt
    const InputMatchRegex = Config[LabelFor].Regex
    const ActicleID = LabelFor.slice(0, -3)

    // Label display
    Label.innerHTML = `<span>${LabelName}</span>${LabelPicture}<input type="file" name="${LabelFor}" id="${LabelFor}" accept="${LabelExt}" />`

    const Input = document.getElementById(LabelFor)

    Input.addEventListener('dragover', e => e.target.parentNode.classList.add('dragover'))
    Input.addEventListener('dragleave', e => e.target.parentNode.classList.remove('dragover'))
    Input.addEventListener('drop', e => e.target.parentNode.classList.remove('dragover'))

    // Input listeners for XML upload
    Input.addEventListener('change', e => {
      const LoaderName = e.target.id.slice(0, -3)
      Loader[LoaderName].Show()
      const UploadedFile = e.target.files[0]
      if (typeof UploadedFile.name !== 'undefined') {
        if (UploadedFile.name.search(InputMatchRegex) === -1) {
          Message({ error: `<em>File selected: ${UploadedFile.name}</em><br />${WordingError.File.Extension} <strong>${LabelExt}</strong>` })
          Loader[LoaderName].Hide()
        } else {
          let reader = new FileReader()
          const parser = new DOMParser()
          let xmlDoc
          reader.addEventListener('load', async e => {
            xmlDoc = parser.parseFromString(e.target.result, 'text/xml')
            switch (ActicleID) {
              case 'Patch':
                await Parser.Patch(xmlDoc)
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
              case 'Cuelist':
                await Parser.Cuelist(xmlDoc)
                Render('Cuelist', true)
                break
              default:
                break
            }
            UploadedFile.Key = ActicleID
            DbAdd({
              Object: 'File',
              Item: new $File(UploadedFile)
            })
            Message({ ok: `<em>File selected: ${UploadedFile.name}</em><br />${WordingOk.File.Loaded}` })
            reader = false
            xmlDoc = false
          })
          reader.readAsText(UploadedFile)
        }
      } else {
        Loader[LoaderName].Hide()
      }
    })
  }
}
