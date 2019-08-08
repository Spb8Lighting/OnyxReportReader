const CollapseMenus = () => {
  const Menus = document.querySelectorAll('.nav-button')
  for (let i = 0; i < Menus.length; ++i) {
    if (Menus[i].classList.contains('is-active')) {
      Menus[i].classList.remove('is-active')
      Menus[i].parentNode.parentNode.querySelector('form').classList.add('hide')
    }
  }
}
const SetActive = ActicleID => {
  const Labels = document.querySelectorAll('label')
  for (let i = 0; i < Labels.length; ++i) {
    const Label = Labels[i]
    if (Label.getAttribute('for') === ActicleID + 'XML') {
      Label.classList.add('active')
    } else {
      Label.classList.remove('active')
    }
  }
  CollapseMenus()
}
const Display = ActicleID => {
  const Articles = document.querySelectorAll('article')
  for (let i = 0; i < Articles.length; ++i) {
    const Article = Articles[i]
    if (Article.getAttribute('id') === ActicleID) {
      Article.classList.add('fade')
      SetActive(ActicleID)
    } else {
      Article.classList.remove('fade')
    }
  }
}
const Loaded = (ArticleID, ToDisplay) => {
  const Label = document.querySelector(`label[for="${ArticleID}XML"]`)
  // Set Loaded class on the Label
  Label.classList.add('loaded')
  // Convert the Label to a navigation link
  Label.addEventListener('click', e => {
    e.preventDefault()
    Display(ArticleID)
  })
  // Remove the input once document loaded
  const Input = document.getElementById(`${ArticleID}XML`)
  if (Input) {
    const Label = Input.parentNode
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
    Label.querySelector('svg title').innerHTML = `Display ${Label.querySelector('span').innerText}`
  }

  // Force to display the new content
  if (ToDisplay) {
    Display(ArticleID)
  }
}

export const Show = ID => {
  Display(ID)
}
export const SetLoaded = (ID, ToDisplay = false) => {
  Loaded(ID, ToDisplay)
}
