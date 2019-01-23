const Option = require('./../config/option')

const ID = {
  ID: 'Patch_ID',
  Name: 'ID',
  Hide: false,
  RowSpan: false,
  MultiPart: true
}
const Name = {
  ID: 'Patch_Name',
  Name: 'Name',
  Hide: false,
  RowSpan: false,
  MultiPart: true
}
const Group = {
  ID: 'Patch_Group',
  Name: 'Group',
  Hide: true,
  RowSpan: false,
  MultiPart: true
}
const Fixture = {
  ID: 'Patch_Fixture',
  Name: 'Fixture',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const Manufacturer = {
  ID: 'Patch_Manufacturer',
  Name: 'Manufacturer',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const Model = {
  ID: 'Patch_Model',
  Name: 'Model',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const Mode = {
  ID: 'Patch_Mode',
  Name: 'Mode',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const FullAddress = {
  ID: 'Patch_FullAddress',
  Name: 'Address',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const Universe = {
  ID: 'Patch_Universe',
  Name: 'Universe',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const Address = {
  ID: 'Patch_Address',
  Name: 'Address',
  Hide: false,
  RowSpan: true,
  MultiPart: false
}
const Invert = {
  ID: 'Patch_Invert',
  Name: 'Invert',
  Hide: false,
  RowSpan: false,
  MultiPart: true
}
let Patch = []
Patch.push(ID)
Patch.push(Name)
Patch.push(Group)
if (Option.Patch.DisplaySimplifyFixture) {
  Patch.push(Fixture)
} else {
  Patch.push(Manufacturer)
  Patch.push(Model)
  Patch.push(Mode)
}
if (Option.Patch.DisplaySimplifyAdress) {
  Patch.push(FullAddress)
} else {
  Patch.push(Universe)
  Patch.push(Address)
}
Patch.push(Invert)

module.exports = {
  Patch
}
