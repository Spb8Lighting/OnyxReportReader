import Message from './../message'

const HideShowSibling = (e, Sibling) => {
  e.preventDefault()
  const Father = e.target.closest('svg')
  const SiblingFather = Father[Sibling]
  if (SiblingFather == null || SiblingFather.nodeName !== 'svg') {
    Message({ ok: `<em>${Sibling === 'previousSibling' ? 'First' : 'Last'} Bank!</em>` })
  } else {
    Father.classList.add('hide')
    SiblingFather.classList.remove('hide')
  }
}

export default (PlaybackContent, ConsoleClass) => {
  const Console = PlaybackContent.querySelector(ConsoleClass)
  const ConsoleDivs = Console.querySelectorAll('div.LeftSide, div.RightSide')
  ConsoleDivs.forEach(ConsoleDiv => {
    const ConsoleSVG = ConsoleDiv.querySelectorAll('svg')
    const NumberofConsole = ConsoleSVG.length
    if (NumberofConsole > 1) {
      for (let i = 0; i < NumberofConsole; i++) {
        const CurrentConsole = ConsoleSVG[i]
        if (i > 0) {
          CurrentConsole.classList.add('hide')
        }
        const ButtonMinus = CurrentConsole.querySelector('.BankSelector .minus')
        const ButtonPlus = CurrentConsole.querySelector('.BankSelector .plus')

        if (ButtonMinus) {
          ButtonMinus.addEventListener('click', e => HideShowSibling(e, 'previousSibling'))
        }
        if (ButtonPlus) {
          ButtonPlus.addEventListener('click', e => HideShowSibling(e, 'nextSibling'))
        }
      }
    }
  })
}
