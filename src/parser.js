import $Show from './object/show'
import $Fixture from './object/fixture'
import $FixtureGroup from './object/group'
import $Preset from './object/preset'
import $Cuelist from './object/cuelist'
import { Db, Add as DbAdd } from './database'
import { Group as OptionGroup } from './config/option'

export const Patch = async $Xml => {
  // Set XML Getter
  const $General = $Xml.getElementsByTagName('Fixtures')[0]
  const $Fixtures = $General.getElementsByTagName('Fixture')
  await Db.transaction('rw', Db.Show, Db.Fixture, () => {
    DbAdd({
      Object: 'Show',
      Item: new $Show($General)
    })
    for (let i = 0; i < $Fixtures.length; i++) {
      if (Object.prototype.hasOwnProperty.call($Fixtures, i)) {
        DbAdd({
          Object: 'Fixture',
          Item: JSON.parse(JSON.stringify(new $Fixture($Fixtures[i])))
        })
      }
    }
  })
}
export const FixtureGroup = async $Xml => {
  // Set XML Getter
  const $General = $Xml.getElementsByTagName('FixtureGroups')[0]
  const $Group = $General.getElementsByTagName('FixtureGroup')
  await Db.transaction('rw', Db.FixtureGroup, Db.Fixture, async () => {
    for (let i = 0; i < $Group.length; i++) {
      if (Object.prototype.hasOwnProperty.call($Group, i)) {
        const NewFixtureGroup = await new $FixtureGroup.Init(i, $Group[i])
        if (OptionGroup.HideAutoGroup) {
          // Remove auto group based on mask attribut
          if (!NewFixtureGroup.Mask) {
            DbAdd({
              Object: 'FixtureGroup',
              Item: JSON.parse(JSON.stringify(NewFixtureGroup))
            })
          }
        } else {
          DbAdd({
            Object: 'FixtureGroup',
            Item: JSON.parse(JSON.stringify(NewFixtureGroup))
          })
        }
      }
    }
  })
}
export const Preset = async $Xml => {
  // Set XML Getter
  const $General = $Xml.getElementsByTagName('Presets')[0]
  const $Presets = $General.getElementsByTagName('Preset')
  await Db.transaction('rw', Db.Preset, Db.Fixture, async () => {
    for (let i = 0; i < $Presets.length; i++) {
      if (Object.prototype.hasOwnProperty.call($Presets, i)) {
        DbAdd({
          Object: 'Preset',
          Item: JSON.parse(JSON.stringify(new $Preset($Presets[i])))
        })
      }
    }
  })
}
export const Cuelist = async $Xml => {
  // Set XML Getter
  const $General = $Xml.getElementsByTagName('CueLists')[0]
  const $Cuelists = $General.children
  await Db.transaction('rw', Db.Cuelist, Db.Physical, async () => {
    for (let i = 0; i < $Cuelists.length; i++) {
      if (Object.prototype.hasOwnProperty.call($Cuelists, i)) {
        const Cuelist = new $Cuelist($Cuelists[i])
        // Define the physical
        if (Cuelist.Physicals) {
          for (let z = 0; z < Cuelist.Physicals.length; z++) {
            const Physical = Cuelist.Physicals[z]
            Physical.CuelistID = Cuelist.ID
            DbAdd({
              Object: 'Physical',
              Item: JSON.parse(JSON.stringify(Physical))
            })
          }
          delete Cuelist.Physicals
        }
        DbAdd({
          Object: 'Cuelist',
          Item: JSON.parse(JSON.stringify(Cuelist))
        })
      }
    }
  })
}
