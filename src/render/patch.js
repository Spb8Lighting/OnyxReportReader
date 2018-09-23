const LStorage = require('./../localstorage')
    , PatchRender = require('./../display')

let Render = () => {
    let Content = {
        thead: '<tr>' + "\n"
            + "\t" + '<th>ID</th>' + "\n"
            + "\t" + '<th>Name</th>' + "\n"
            + "\t" + '<th>Manufacturer</th>' + "\n"
            + "\t" + '<th>Model</th>' + "\n"
            + "\t" + '<th>Personality</th>' + "\n"
            + "\t" + '<th>Universe</th>' + "\n"
            + "\t" + '<th>Address</th>' + "\n"
            + "\t" + '<th>Invert</th>' + "\n"
            + '</tr>',
        tbody: []
    }
    const Fixtures = LStorage.Get({ key: 'Fixtures' })
    const Show = LStorage.Get({ key: 'Show' })

    for (let i = 0; i < Object.keys(Fixtures).length; ++i) {
        let Fixture = Fixtures[i]
        Content.tbody.push('<tr>' + "\n"
            + "\t" + '<td class="number">' + Fixture.ID + '</td>' + "\n"
            + "\t" + '<td>' + Fixture.Name + '</td>' + "\n"
            + "\t" + '<td><a target="_blank" href="https://onyxfixturefinder.com/#SearchMode=live&amp;DisplayMode=1&amp;Manufacturer=' + encodeURIComponent(Fixture.Manufacturer) + '" />' + Fixture.Manufacturer + '</a></td>' + "\n"
            + "\t" + '<td><a pop href="https://onyxfixturefinder.com/fixture/' + encodeURIComponent(Fixture.Manufacturer) + '/' + encodeURIComponent(Fixture.Model) + '" />' + Fixture.Model + '</a></td>' + "\n"
            + "\t" + '<td>' + Fixture.Mode + '</td>' + "\n"
            + "\t" + '<td class="number">' + Fixture.Universe + '</td>' + "\n"
            + "\t" + '<td class="number">' + Fixture.Address + '</td>' + "\n"
            + "\t" + '<td>' + Fixture.Invert + '</td>' + "\n"
            + '</tr>')
    }
    Content.Header = 'Onyx patch summary for "' + Show.Name + '" <em>(software build ' + Show.Build + ')</em>'
    Content.Description = 'Patch summary: ' + Show.Name + ' <em>(' + Show.FixturesCount + ' fixture' + ((Show.FixturesCount > 1) ? 's' : '') + ')</em>'
    Content.Table = '<table class="patch">' + "\n"
        + '<thead>' + "\n"
        + Content.thead + "\n"
        + '</thead>' + "\n"
        + '<tbody>' + "\n"
        + Content.tbody.join("\n") + "\n"
        + '</tbody>' + "\n"
        + '</table>'

    let PatchArticle = document.getElementById('Patch')

    PatchArticle.innerHTML = `<h2>Patch</h2>
                                <p>${Content.Header}</p>
                                <p>${Content.Description}</p>
                                ${Content.Table}`
    document.querySelector('label[for="PatchXML"]').classList.add('loaded', 'active')
    PatchRender('Patch')
}

module.exports = Render