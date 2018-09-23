const $Show = require('./object/show')
const $Fixture = require('./object/fixture')
const LStorage = require('./localstorage')

module.exports = {
    Patch: $Xml => {
        //Set XML Getter
        let $General = $Xml.getElementsByTagName('Fixtures')[0]
            , $Fixtures = $General.getElementsByTagName('Fixture')
            , FixtureList = {}
        LStorage.Set({
            key: 'Show',
            value: new $Show($General)
        })
        for (let i = 0; i < $Fixtures.length; i++) {
            if ($Fixtures.hasOwnProperty(i)) {
                FixtureList[i] = JSON.parse(JSON.stringify(new $Fixture($Fixtures[i])))
            }
        }
        LStorage.Set({
            key: 'Fixtures',
            value: FixtureList
        })
    }
}