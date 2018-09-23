let Display = ActicleID => {
    let Articles = document.querySelectorAll('article')
    for (let i = 0; i < Articles.length; ++i) {
        let Article = Articles[i]
        if (Article.getAttribute('id') == ActicleID) {
            Article.classList.add('fade')
        } else {
            Article.classList.remove('fade')
        }
    }
}

module.exports = Display