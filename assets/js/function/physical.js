import Dexie from 'dexie'
import { Db, Get as DbGet } from '../database.js'
import * as Consoles from '../config/console.js'

const GetConsole = async Name => {
  const parser = new DOMParser()
  const Console = await Consoles[Name].SVG()
  return parser.parseFromString(Console, 'image/svg+xml')
}

const TriDigit = val => {
  var v = val
  while ((v + '').length < 3) {
    v = '0' + v
  }
  return v
}

const UcWords = s => s && s[0].toUpperCase() + s.slice(1).toLowerCase()

const FillButton = (CurrentFader, CuelistName, LoopID) => {
  const TSpan = CurrentFader.querySelectorAll('tspan')
  if (CuelistName.length > 6) {
    const CuelistSplit = CuelistName.split(' ')
    if (CuelistSplit.length > 1) {
      if (CuelistSplit[0]) {
        TSpan[0].innerHTML = UcWords(CuelistSplit[0])
      }
      if (CuelistSplit[1]) {
        TSpan[1].innerHTML = UcWords(CuelistSplit[1])
      }
      if (CuelistSplit[2]) {
        TSpan[2].innerHTML = UcWords(CuelistSplit[2])
      }
    } else {
      TSpan[1].innerHTML = UcWords(CuelistName)
    }
  } else {
    TSpan[1].innerHTML = UcWords(CuelistName)
  }
}

export const Console = {
  M1: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      // Get number of bank info per type
      const MainListOfBanks = await Db.Physical.where('TypePageBank').startsWith('MainPlaybackFader').uniqueKeys()
      const MainNumberOfBanks = MainListOfBanks.length

      const SubListOfBanks = await Db.Physical.where('TypePageBank').startsWith('SubmasterPlayback').uniqueKeys()
      const SubNumberOfBanks = SubListOfBanks.length

      // Create the console container
      const MPlay = document.createElement('div')
      MPlay.className = 'M1HD'
      const MPlayH2 = document.createElement('h2')
      MPlayH2.innerHTML = `M1 HD <em>(${MainNumberOfBanks} main bank${MainNumberOfBanks > 1 ? 's' : ''}, ${SubNumberOfBanks} submaster bank${SubNumberOfBanks > 1 ? 's' : ''})</em>`
      MPlay.appendChild(MPlayH2)

      const Wrapper = document.createElement('div')
      Wrapper.className = 'flex-container'
      const LeftSide = document.createElement('div')
      LeftSide.className = 'LeftSide'
      const RightSide = document.createElement('div')
      RightSide.className = 'RightSide'

      // Get the console SVG image
      const SVGMPlay = await Dexie.waitFor(GetConsole('M1HD'))
      SVGMPlay.querySelector('style').remove()

      // Create a dedicated SVG picture for the left part
      const MPlayLeft = SVGMPlay.cloneNode(true)
      MPlayLeft.querySelector('svg').setAttribute('viewBox', '0 0 75 145.5864')
      MPlayLeft.querySelector('g.rightside').remove()

      // Create a dedicated SVG picture for the right part
      const MplayRight = SVGMPlay.cloneNode(true)
      MplayRight.querySelector('svg').setAttribute('viewBox', '75 0 176.2163 145.5864')
      MplayRight.querySelector('g.leftside').remove()

      // Create all parts following the number of main banks
      for (let z = 0; z < MainNumberOfBanks; z++) {
        // Clone SVG picture the current bank
        const CurrentMplayRight = MplayRight.cloneNode(true)
        // Loop over number of playbacks for the right side
        for (let i = 1; i <= 10; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${MainListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            const Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = CurrentMplayRight.querySelector(`.MainFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        RightSide.appendChild(CurrentMplayRight.documentElement)
      }
      // Create all parts following the number of main banks
      for (let z = 0; z < SubNumberOfBanks; z++) {
        // Clone SVG picture the current bank
        const CurrentMPlayLeft = MPlayLeft.cloneNode(true)

        // Loop other number of playbacks for the left side
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${SubListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            const Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = CurrentMPlayLeft.querySelector(`.SubFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        LeftSide.appendChild(CurrentMPlayLeft.documentElement)
      }
      Wrapper.appendChild(LeftSide)
      Wrapper.appendChild(RightSide)
      MPlay.appendChild(Wrapper)
      return MPlay
    })
  },
  MTouch: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      const Prefix = 'MainPlaybackFader'
      const ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      const NumberOfBanks = ListOfBanks.length
      const MTouch = document.createElement('div')
      MTouch.className = 'M-Touch'
      const MTouchH2 = document.createElement('h2')
      MTouchH2.innerHTML = `M-Touch <em>(${NumberOfBanks} bank${NumberOfBanks > 1 ? 's' : ''})</em>`
      MTouch.appendChild(MTouchH2)

      const Wrapper = document.createElement('div')
      Wrapper.className = 'flex-container'
      const LeftSide = document.createElement('div')
      LeftSide.className = 'LeftSide'

      const SVGMTouch = await Dexie.waitFor(GetConsole('MTouch'))
      for (let z = 0; z < NumberOfBanks; z++) {
        const NewMTouch = SVGMTouch.cloneNode(true)
        NewMTouch.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        NewMTouch.querySelector('style').remove()

        for (let i = 1; i <= 20; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            const Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewMTouch.querySelector(`.MainFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        LeftSide.appendChild(NewMTouch.documentElement)
      }
      Wrapper.appendChild(LeftSide)
      MTouch.appendChild(Wrapper)
      return MTouch
    })
  },
  MPlay: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      // Get number of bank info per type
      const Prefix = 'SubmasterPlayback'
      const ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      const NumberOfBanks = ListOfBanks.length

      // Create the console container
      const MPlay = document.createElement('div')
      MPlay.className = 'M-Play'
      const MPlayH2 = document.createElement('h2')
      MPlayH2.innerHTML = `M-Play <em>(${NumberOfBanks} submaster bank${NumberOfBanks > 1 ? 's' : ''})</em>`
      MPlay.appendChild(MPlayH2)

      const Wrapper = document.createElement('div')
      Wrapper.className = 'flex-container'
      const LeftSide = document.createElement('div')
      LeftSide.className = 'LeftSide'
      const RightSide = document.createElement('div')
      RightSide.className = 'RightSide'

      // Get the console SVG image
      const SVGMPlay = await Dexie.waitFor(GetConsole('MPlay'))
      SVGMPlay.querySelector('style').remove()

      // Create a dedicated SVG picture for the left part
      const MPlayLeft = SVGMPlay.cloneNode(true)
      MPlayLeft.querySelector('svg').setAttribute('viewBox', '0 0 465 304.5')
      MPlayLeft.querySelector('g.rightside').remove()

      // Create a dedicated SVG picture for the right part
      const MplayRight = SVGMPlay.cloneNode(true)
      MplayRight.querySelector('svg').setAttribute('viewBox', '465 0 147.5 304.5')
      MplayRight.querySelector('g.leftside').remove()

      // Create all parts following the number of banks
      for (let z = 0; z < NumberOfBanks; z++) {
        // Clone SVG picture the current bank
        const CurrentMPlayLeft = MPlayLeft.cloneNode(true)
        const CurrentMplayRight = MplayRight.cloneNode(true)
        // Set the Bank Number
        CurrentMPlayLeft.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        CurrentMplayRight.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)

        // Loop other number of playbacks for the left side
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            const Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = CurrentMPlayLeft.querySelector(`.SubFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        // Loop other number of playbacks for the right side
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            const Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = CurrentMplayRight.querySelector(`.Button${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        LeftSide.appendChild(CurrentMPlayLeft.documentElement)
        RightSide.appendChild(CurrentMplayRight.documentElement)
      }
      Wrapper.appendChild(LeftSide)
      Wrapper.appendChild(RightSide)
      MPlay.appendChild(Wrapper)
      return MPlay
    })
  }
}
