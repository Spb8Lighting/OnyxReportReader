import { Db, Get as DbGet } from './../database'
import { Cuelist as OptionCuelist } from './../config/option'
import * as Consoles from './../config/console'

const TriDigit = val => {
  var v = val
  while ((v + '').length < 3) {
    v = '0' + v
  }
  return v
}
const CreateButton = (Class, Cuelist) => {
  let NewClass = Class
  if (OptionCuelist.AlternativePlaybackBack && typeof Cuelist === 'object') {
    NewClass = `${Class} Type-${Cuelist.Type}`
  }
  let Base = `<div class="SButton ${NewClass}"><span class="content">`
  if (Class === 'ButtonTopTop') {
    if (typeof Cuelist === 'object') {
      Base += Cuelist.FaderID
    } else {
      Base += Cuelist
    }
  }
  if (typeof Cuelist === 'object') {
    if (Class === 'ButtonTop') {
      Base += `<a href="#Cuelist-${Cuelist.ID}">#${Cuelist.ID}</a>`
    } else if (Class === 'ButtonBottom') {
      // Nothing to do today
    } else if (Class === 'ButtonBottomBottom') {
      Base += `<a href="#Cuelist-${Cuelist.ID}">${Cuelist.Name}</a>`
    }
  }
  Base += `</span></div>`
  return Base
}
const CreateFader = (Class, Cuelist) => {
  if (typeof Cuelist === 'object') {
    Class = `${Class} Type-${Cuelist.Type}`
  }
  return `<div class="SFader ${Class}"></div>`
}
const Button = {
  TopTop: (Cuelist) => {
    return CreateButton('ButtonTopTop', Cuelist)
  },
  Top: (Cuelist) => {
    return CreateButton('ButtonTop', Cuelist)
  },
  Bottom: (Cuelist) => {
    return CreateButton('ButtonBottom', Cuelist)
  },
  BottomBottom: (Cuelist) => {
    return CreateButton('ButtonBottomBottom', Cuelist)
  }
}
const Fader = {
  Touch: {
    Fader: (Cuelist) => {
      return `${Button.TopTop(Cuelist)}` + '\n' +
        `${Button.Top(Cuelist)}` + '\n' +
        CreateFader('FaderTouch', Cuelist) + '\n' +
        `${Button.BottomBottom(Cuelist)}`
    },
    Button: (Cuelist) => {
      return `${Button.BottomBottom(Cuelist)}`
    }
  },
  Play: {
    Fader: (Cuelist) => {
      return CreateFader('FaderTouch', Cuelist) + '\n' +
        `${Button.Bottom(Cuelist)}` + '\n' +
        `${Button.BottomBottom(Cuelist)}`
    },
    Button: (Cuelist) => {
      return `${Button.BottomBottom(Cuelist)}`
    }
  },
  Physical: {
    Fader: (Cuelist) => {
      return `${Button.TopTop(Cuelist)}` + '\n' +
        `${Button.Top(Cuelist)}` + '\n' +
        CreateFader('Fader', Cuelist) + '\n' +
        `${Button.Bottom(Cuelist)}` + '\n' +
        `${Button.BottomBottom(Cuelist)}`
    }
  }
}

const UcWords = s => s && s[0].toUpperCase() + s.slice(1).toLowerCase()

const FillButton = (CurrentFader, CuelistName, LoopID) => {
  if (CuelistName.length > 6) {
    let CuelistSplit = CuelistName.split(' ')
    if (CuelistSplit.length > 1) {
      if (CuelistSplit[0]) {
        CurrentFader.querySelector(`tspan.Cuelist${LoopID}-1`).innerHTML = UcWords(CuelistSplit[0])
      }
      if (CuelistSplit[1]) {
        CurrentFader.querySelector(`tspan.Cuelist${LoopID}-2`).innerHTML = UcWords(CuelistSplit[1])
      }
      if (CuelistSplit[2]) {
        CurrentFader.querySelector(`tspan.Cuelist${LoopID}-3`).innerHTML = UcWords(CuelistSplit[2])
      }
    } else {
      CurrentFader.querySelector(`tspan.Cuelist${LoopID}-2`).innerHTML = UcWords(CuelistName)
    }
  } else {
    CurrentFader.querySelector(`tspan.Cuelist${LoopID}-2`).innerHTML = UcWords(CuelistName)
  }
}

export const Console = {
  Nx2: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      let Prefix = 'MainPlaybackFader'
      let ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      let MTouch = []
      MTouch.push('<h2>M2PC/M2GO/Nx2</h2><div class="grid-1 has-gutter">')

      for (let z = 0; z < ListOfBanks.length; z++) {
        let Faders = await DbGet({ Object: 'Physical', Index: 'TypePageBank', ItemID: ListOfBanks[z] })
        let ActualBankName = Faders.PageBankName ? Faders.PageBankName : `Bank ${z + 1}`
        MTouch.push(`<div>`)
        MTouch.push(`<h3>${ActualBankName}</h3>`)
        // Generate Faders
        MTouch.push('<div class="Nx2 grid-10 has-gutter">')
        MTouch.push(`<div class="grid-10 col-10">`)
        for (let i = 1; i <= 10; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            Cuelist.FaderID = i
            MTouch.push(`<div class="Fader">${Fader.Physical.Fader(Cuelist)}</div>`)
          } else {
            MTouch.push(`<div class="Fader">${Fader.Physical.Fader(i)}</div>`)
          }
        }
        MTouch.push('</div>')
        MTouch.push('</div>')
        MTouch.push('</div>')
      }
      MTouch.push('</div>')
      return MTouch.join('')
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
      let parser = new DOMParser()
      for (let z = 0; z < NumberOfBanks; z++) {
        let NewMTouch = parser.parseFromString(Consoles.MTouch.SVG, 'image/svg+xml')
        NewMTouch.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        NewMTouch.querySelector('style').remove()

        for (let i = 1; i <= 20; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewMTouch.querySelector(`.Fader${i}`)
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
      let parser = new DOMParser()
      for (let z = 0; z < NumberOfBanks; z += 2) {
        let NewMPlay = parser.parseFromString(Consoles.MPlay.SVG, 'image/svg+xml')
        NewMPlay.querySelector('.Bank tspan').innerHTML = TriDigit(z + 1)
        NewMPlay.querySelector('.BankSub tspan').innerHTML = TriDigit(z + 2)
        NewMPlay.querySelector('style').remove()

        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            CurrentFader = NewMPlay.querySelector(`.Fader${i}`)
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
