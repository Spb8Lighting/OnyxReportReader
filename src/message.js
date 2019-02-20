export default message => {
  /**
   * Display a temporary message which can be close by clicking on it before timemout
   * @param {JSON} message
   */
  if (typeof AutoHideFooter !== 'undefined') {
    // eslint-disable-next-line no-undef
    clearTimeout(AutoHideFooter)
  }

  let Footer = document.querySelector('footer')
  let FooterDisplay = false

  const ShowFooter = () => {
    Footer.classList.add('fade')
    Footer.style.width = ''
    Footer.style.margin = ''
    Footer.style.padding = ''
  }
  const HideFooter = () => {
    Footer.classList.remove('fade')
    Footer.style.width = 0
    Footer.style.margin = 0
    Footer.style.padding = 0
  }

  if (message.error) {
    Footer.setAttribute('class', 'btn--danger')
    Footer.innerHTML = message.error
    FooterDisplay = true
  } else if (message.warning) {
    Footer.setAttribute('class', 'btn--warning')
    Footer.innerHTML = message.warning
    FooterDisplay = true
  } else if (message.ok) {
    Footer.setAttribute('class', 'btn--success')
    Footer.innerHTML = message.ok
    FooterDisplay = true
  }
  if (FooterDisplay) {
    ShowFooter()
    let AutoHideFooter = setTimeout(() => { HideFooter() }, 5000)
    Footer.addEventListener('click', () => {
      if (typeof AutoHideFooter !== 'undefined') {
        clearTimeout(AutoHideFooter)
      }
      HideFooter()
    })
    Footer.addEventListener('mouseover', () => {
      if (typeof AutoHideFooter !== 'undefined') {
        clearTimeout(AutoHideFooter)
      }
    })
  }
}
