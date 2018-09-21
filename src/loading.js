export default () => {
    let Config = require('./config/type.js')
        , Labels = document.querySelectorAll('label')

    for (var i = 0; i < Labels.length; ++i) {
        let Label = Labels[i]
            , LabelFor = Label.getAttribute('for')
            , LabelName = Config[LabelFor].Name
            , LabelPicture = Config[LabelFor].Picture
            , LabelExt = Config[LabelFor].FileExt

        Label.innerHTML = `<span class="w100p txtcenter">${LabelName}</span>${LabelPicture}`
        Label.setAttribute('accept', LabelExt)
    }
}