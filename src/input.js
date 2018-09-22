import Message from './message'
import Config from './config/type'
import Wording from './config/wording'

export default () => {

    //########################
    //   Form Configuration
    //########################
    let Labels = document.querySelectorAll('label')
        , Articles = document.querySelectorAll('article')

    for (let i = 0; i < Labels.length; ++i) {
        let Label = Labels[i]
            , LabelFor = Label.getAttribute('for')
            , LabelName = Config[LabelFor].Name
            , LabelPicture = Config[LabelFor].Picture
            , LabelExt = Config[LabelFor].FileExt
            , Input = document.getElementById(LabelFor)
            , InputMatchRegex = Config[LabelFor].Regex
            , ActicleID = LabelFor.slice(0, -3)

        // Label display
        Label.innerHTML = `<span class="w100p txtcenter">${LabelName}</span>${LabelPicture}`
        Label.setAttribute('accept', `${LabelExt}, text/xml`)

        // Input listeners for XML upload
        Input.addEventListener('change', () => {
            let UploadedFile = Input.files[0]
            if (typeof UploadedFile.name != 'undefined') {
                if (UploadedFile.name.search(InputMatchRegex) == -1) {
                    Message({ error: `<em>File selected: ${UploadedFile.name}</em><br />${Wording.Error.File.Extension} <strong>${LabelExt}</strong>` })
                } else {
                    Label.classList.add('loaded')
                    for (let i = 0; i < Articles.length; ++i) {
                        let Article = Articles[i]
                        if (Article.getAttribute('id') == ActicleID) {
                            Article.classList.add('fade')
                        } else {
                            Article.classList.remove('fade')
                        }
                    }
                    let reader = new FileReader()
                        , parser = new DOMParser()
                        , xmlDoc

                    reader.addEventListener('load', e => {
                        xmlDoc = parser.parseFromString(e.target.result, 'text/xml')
                        // $dropperText.innerHTML = $Message.Action.WiP

                        // $Patch.Parse.XML(xmlDoc)
                        // $Run.Patch()

                        reader = false
                        xmlDoc = false
                    })
                    reader.readAsText(UploadedFile)
                    Message({ ok: `<em>File selected: ${UploadedFile.name}</em><br />${Wording.Ok.File.Loaded}` })
                    console.log(reader)
                }
            }
        })
    }
}