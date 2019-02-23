import Dexie from 'dexie'
import { Db, Get as DbGet } from './../database'
import * as Consoles from './../config/console'

const GetConsole = async Name => {
  let parser = new DOMParser()
  let Console = await Consoles[Name].SVG()
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
  let TSpan = CurrentFader.querySelectorAll('tspan')
  if (CuelistName.length > 6) {
    let CuelistSplit = CuelistName.split(' ')
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
      let Prefix = 'MainPlaybackFader'
      let ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      let NumberOfBanks = ListOfBanks.length
      let M1HD = document.createElement('div')
      M1HD.className = 'M1HD'
      let M1HDH2 = document.createElement('h2')
      M1HDH2.innerHTML = `M1 HD <em>(${NumberOfBanks} bank${NumberOfBanks > 1 ? 's' : ''})</em>`
      M1HD.appendChild(M1HDH2)
      for (let z = 0; z < NumberOfBanks; z++) {
        let NewM1HD = await Dexie.waitFor(GetConsole('M1HD'))
        // NewM1HD.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        NewM1HD.querySelector('style').remove()

        for (let i = 1; i <= 10; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewM1HD.querySelector(`.MainFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewM1HD.querySelector(`.SubFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        M1HD.appendChild(NewM1HD.documentElement)
      }
      return M1HD
    })
  },
  MTouch: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      let Prefix = 'MainPlaybackFader'
      let ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      let NumberOfBanks = ListOfBanks.length
      let MTouch = document.createElement('div')
      MTouch.className = 'M-Touch'
      let MTouchH2 = document.createElement('h2')
      MTouchH2.innerHTML = `M-Touch <em>(${NumberOfBanks} bank${NumberOfBanks > 1 ? 's' : ''})</em>`
      MTouch.appendChild(MTouchH2)
      for (let z = 0; z < NumberOfBanks; z++) {
        let NewMTouch = await Dexie.waitFor(GetConsole('MTouch'))
        NewMTouch.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        NewMTouch.querySelector('style').remove()

        for (let i = 1; i <= 20; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewMTouch.querySelector(`.MainFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        MTouch.appendChild(NewMTouch.documentElement)
      }
      return MTouch
    })
  },
  MPlay: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      let Prefix = 'SubmasterPlayback'
      let ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      let NumberOfBanks = ListOfBanks.length
      let MPlay = document.createElement('div')
      MPlay.className = 'M-Play'
      let MPlayH2 = document.createElement('h2')
      MPlayH2.innerHTML = `M-Play <em>(${NumberOfBanks} bank${NumberOfBanks > 1 ? 's' : ''})</em>`
      MPlay.appendChild(MPlayH2)
      for (let z = 0; z < NumberOfBanks; z += 2) {
        let NewMPlay = await Dexie.waitFor(GetConsole('MPlay'))
        NewMPlay.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        NewMPlay.querySelector('.BankSub tspan').innerHTML = TriDigit(z + 2)
        NewMPlay.querySelector('style').remove()
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewMPlay.querySelector(`.SubFader${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z + 1]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewMPlay.querySelector(`.Button${i}`)
            if (typeof Cuelist === 'object') {
              CurrentFader.classList.add(`Type-${Cuelist.Type}`)
              CurrentFader.innerHTML = `<a href="#Cuelist-${Cuelist.ID}">${CurrentFader.innerHTML}</a>`
              FillButton(CurrentFader, Cuelist.Name, i)
            }
          }
        }
        MPlay.appendChild(NewMPlay.documentElement)
      }
      return MPlay
    })
  }
}
