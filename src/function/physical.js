import { Db, Get as DbGet } from './../database'
import { Cuelist as OptionCuelist } from './../config/option'
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
      let MTouch = []
      MTouch.push('<h2>M-Touch</h2><div class="grid-1 has-gutter">')

      for (let z = 0; z < ListOfBanks.length; z++) {
        let Faders = await DbGet({ Object: 'Physical', Index: 'TypePageBank', ItemID: ListOfBanks[z] })
        let ActualBankName = Faders.PageBankName ? Faders.PageBankName : `Bank ${z + 1}`
        MTouch.push(`<div>`)
        MTouch.push(`<h3>${ActualBankName}</h3>`)
        // Generate Faders
        MTouch.push('<div class="MTouch grid-12 has-gutter">')
        MTouch.push(`<div class="grid-10 col-10">`)
        for (let i = 1; i <= 10; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            Cuelist.FaderID = i
            MTouch.push(`<div class="Fader">${Fader.Touch.Fader(Cuelist)}</div>`)
          } else {
            MTouch.push(`<div class="Fader">${Fader.Touch.Fader(i)}</div>`)
          }
        }
        MTouch.push('</div>')
        MTouch.push(`<div class="grid-2 col-2">`)
        // Generate buttons
        for (let i = 11; i <= 20; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            Cuelist.FaderID = i
            MTouch.push(`<div class="Button">${Fader.Touch.Button(Cuelist)}</div>`)
          } else {
            MTouch.push(`<div class="Button">${Fader.Touch.Button(i)}</div>`)
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
  MPlay: async () => {
    return Db.transaction('r', Db.Cuelist, Db.Physical, async () => {
      let Prefix = 'SubmasterPlayback'
      let ListOfBanks = await Db.Physical.where('TypePageBank').startsWith(Prefix).uniqueKeys()
      let MTouch = []
      MTouch.push('<h2>M-Play</h2>')
      MTouch.push('<div class="grid-1 has-gutter">')
      for (let z = 0; z < ListOfBanks.length; z += 2) {
        let Faders = await DbGet({ Object: 'Physical', Index: 'TypePageBank', ItemID: ListOfBanks[z] })
        let ActualBankName = Faders.PageBankName ? Faders.PageBankName : `Bank ${z + 1}`
        let NextActualBankName = `Bank ${z + 2}`
        MTouch.push(`<div><h3>${ActualBankName} & ${NextActualBankName}</h3>`)
        // Generate Faders
        MTouch.push('<div class="MPlay grid-16 has-gutter">')
        MTouch.push('<div class="col-12">')
        MTouch.push('<div class="grid-12">')
        for (let i = 1; i <= 12; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            Cuelist.FaderID = i
            MTouch.push(`<div class="Fader">${Fader.Play.Fader(Cuelist)}</div>`)
          } else {
            MTouch.push(`<div class="Fader">${Fader.Play.Fader(i)}</div>`)
          }
        }
        MTouch.push('</div>')
        // Empty Grid buttons
        MTouch.push('<div class="grid-12">')
        for (let i = 1; i <= 12; i++) {
          MTouch.push(`<div class="Button Empty">${Fader.Play.Button(i)}</div>`)
        }
        MTouch.push('</div>')
        MTouch.push('<div class="grid-12">')
        // Generate buttons
        for (let i = 13; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            Cuelist.FaderID = i
            MTouch.push(`<div class="Button">${Fader.Play.Button(Cuelist)}</div>`)
          } else {
            MTouch.push(`<div class="Button">${Fader.Play.Button(i)}</div>`)
          }
        }
        MTouch.push('</div>')
        MTouch.push('</div>')
        MTouch.push('<div class="grid-4 col-4">')
        // Generate buttons
        for (let i = 1; i <= 24; i++) {
          let CurrentFader = await DbGet({ Object: 'Physical', Index: 'TypePageBankPosition', ItemID: `${ListOfBanks[z + 1]}-${i}` })
          if (CurrentFader) {
            let Cuelist = await DbGet({ Object: 'Cuelist', Index: 'ID', ItemID: CurrentFader.CuelistID })
            Cuelist.FaderID = i
            MTouch.push(`<div class="Button">${Fader.Play.Button(Cuelist)}</div>`)
          } else {
            MTouch.push(`<div class="Button">${Fader.Play.Button(i)}</div>`)
          }
        }
        MTouch.push('</div>')
        MTouch.push('</div>')
      }
      MTouch.push('</div>')
      return MTouch.join('')
    })
  }
}
