module.exports = {
  Patch: {
    DisplayInvertAxesIcon: false,
    // In the patch page, permit to simplified the group abbreviation title to the minimum
    DisplaySimplifiedGroup: true,
    // In the patch page, permit to merge the column Manufacturer and Model
    DisplaySimplifyFixture: true,
    // In the patch page, permit to merge the column Universe and Address
    DisplaySimplifyAdress: true
  },
  Group: {
    // In the group page, permit to simplified the Fixture abbreviation title to the minimum
    DisplaySimplifiedFixture: true,
    // Hide the AutoGroup
    HideAutoGroup: true
  },
  Preset: {
    // In the preset page, permit to simplified the Fixture abbreviation title to the minimum
    DisplaySimplifiedPreset: true,
    // In the group page, permit to display additionnal column with all fixture per preset (time consuming, and performance are poor)
    DisplayMergedFixturePerPreset: false
  }
}
