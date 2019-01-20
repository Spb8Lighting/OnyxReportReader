let SetActive = ActicleID => {
  let Labels = document.querySelectorAll('label')
  for (let i = 0; i < Labels.length; ++i) {
    let Label = Labels[i]
    if (Label.getAttribute('for') === ActicleID + 'XML') {
      Label.classList.add('active')
    } else {
      Label.classList.remove('active')
    }
  }
}
let Display = ActicleID => {
  let Articles = document.querySelectorAll('article')
  for (let i = 0; i < Articles.length; ++i) {
    let Article = Articles[i]
    if (Article.getAttribute('id') === ActicleID) {
      Article.classList.add('fade')
      SetActive(ActicleID)
    } else {
      Article.classList.remove('fade')
    }
  }
}
let Loaded = ArticleID => {
  let Label = document.querySelector(`label[for="${ArticleID}XML"]`)
  // Set Loaded class on the Label
  Label.classList.add('loaded')
  // Convert the Label to a navigation link
  Label.addEventListener('click', e => {
    e.preventDefault()
    Display(ArticleID)
  })
  // Remove the input once document loaded
  let Input = document.getElementById(`${ArticleID}XML`)
  if (Input) {
    let Label = Input.parentNode
    // Lock the next drag and drop on the label once input removed
    Label.addEventListener('dragover', e => {
      e.preventDefault()
      e.dataTransfer.effectAllowed = 'none'
      e.dataTransfer.dropEffect = 'none'
      return false
    })
    Label.addEventListener('drop', e => {
      e.preventDefault()
      e.dataTransfer.effectAllowed = 'none'
      e.dataTransfer.dropEffect = 'none'
      return false
    })
    Label.removeChild(Input)
  }

  // Force to display the new content
  Display(ArticleID)
}

module.exports = {
  Show: ID => {
    Display(ID)
  },
  SetLoaded: ID => {
    Loaded(ID)
  }
}
