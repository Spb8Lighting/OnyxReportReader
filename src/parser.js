const $Show = require('./object/show')
const $Fixture = require('./object/fixture')
const $FixtureGroup = require('./object/fixturegroup')
const DB = require('./database')

module.exports = {
  Patch: $Xml => {
    // Set XML Getter
    let $General = $Xml.getElementsByTagName('Fixtures')[0]
    let $Fixtures = $General.getElementsByTagName('Fixture')
    DB.Add({
      Object: 'Show',
      Item: new $Show($General)
    })
    for (let i = 0; i < $Fixtures.length; i++) {
      if ($Fixtures.hasOwnProperty(i)) {
        DB.Add({
          Object: 'Fixture',
          Item: JSON.parse(JSON.stringify(new $Fixture($Fixtures[i])))
        })
      }
    }
  },
  FixtureGroup: $Xml => {
    // Set XML Getter
    let $General = $Xml.getElementsByTagName('FixtureGroups')[0]
    let $Group = $General.getElementsByTagName('FixtureGroup')
    for (let i = 0; i < $Group.length; i++) {
      if ($Group.hasOwnProperty(i)) {
        DB.Add({
          Object: 'FixtureGroup',
          Item: JSON.parse(JSON.stringify(new $FixtureGroup($Group[i])))
        })
      }
    }
  }
}
