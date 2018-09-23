module.exports = message => {
    /**
     * Display a temporary message which can be close by clicking on it before timemout
     * @param {JSON} message
     */
    if(typeof AutoHideFooter != 'undefined') {
        clearTimeout(AutoHideFooter)
    }

    let Footer = document.querySelector('footer')
        , FooterDisplay = false
    
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
    if(FooterDisplay) {
        Footer.classList.add('fade')
        let AutoHideFooter = setTimeout(() => { Footer.classList.remove('fade') }, 5000)
        Footer.addEventListener('click', () => {
            if(typeof AutoHideFooter != 'undefined') {
                clearTimeout(AutoHideFooter)
            }
            Footer.classList.remove('fade') 
        })
        Footer.addEventListener('mouseover', () => {
            if(typeof AutoHideFooter != 'undefined') {
                clearTimeout(AutoHideFooter)
            }
        })
    }
}