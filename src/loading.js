export default () => {
    let Config = require('./config/type.js')
        , Labels = document.querySelectorAll('label')

    for (var i = 0; i < Labels.length; ++i) {
        let Title = document.createElement('title')
            , Label = Labels[i]
            , LabelFor = Label.getAttribute('for')
            , LabelTitle = Label.innerHTML
            , LabelPicture = Config[LabelFor].Picture
            , LabelExt = Config[LabelFor].FileExt

        Label.innerHTML = LabelPicture
        Title.innerHTML = LabelTitle
        Label.querySelector('svg').appendChild(Title)
        Label.setAttribute('accept', LabelExt)
    }
}