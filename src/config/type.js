module.exports = {
  PatchXML: {
    Name: 'Patch',
    Picture: '<svg viewBox="0 0 24 24"><title>Choose Patch file or drag it here</title><path d="M12 2C8.8 2 6 4.12 6 7v.22c0 2.99 1 5.31 1 5.31S8.73 15 12 15s5-2.47 5-2.47 1-2.3 1-5.31V7c0-2.88-2.8-5-6-5zm0 2c2.33 0 4 1.46 4 3s-1.67 3-4 3-4-1.46-4-3 1.67-3 4-3zM3 7v9.25c0 .44.3.84.72.97L9.47 19h.81c-.06.1-.12.2-.15.31L6 20v2h12v-2l-4.13-.69a1.8 1.8 0 0 0-.15-.31h.81l5.75-1.78c.42-.13.72-.53.72-.97V7h-2v7.25L14 16h-4l-5-1.75V7zm9 1c-.55 0-1 .41-1 .9 0 .5.45.91 1 .91s1-.4 1-.9S12.55 8 12 8z"/></svg>',
    FileExt: '.onyxpatch.xml',
    Regex: /\.onyxpatch\.xml$/i
  },
  FixtureGroupXML: {
    Name: 'Groups',
    Picture: '<svg viewBox="0 0 24 24"><title>Choose Fixture Group file or drag it here</title><path d="M2 2v4h1v12H2v4h4v-1h12v1h4v-4h-1V6h1V2h-4v1H6V2zm4 3h12v1h1v12h-1v1H6v-1H5V6h1zm1 2v6h6V7zm7 4v3h-3v3h6v-6z" /></svg>',
    FileExt: '.OnyxFixtureGroup.xml',
    Regex: /\.onyxfixturegroup\.xml$/i
  },
  PresetXML: {
    Name: 'Presets',
    Picture: '<svg viewBox="0 0 24 24"><title>Choose Preset file or drag it here</title><path d="M4 2v2H3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6V2H4zm7 0v12h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1V2h-2zm7 0v7h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1V2h-2zM4 9v13h2V9H4zm14 5v8h2v-8h-2zm-7 5v3h2v-3h-2z"/></svg>',
    FileExt: '.OnyxPresetsUsageReport.xml',
    Regex: /\.onyxpresetsusagereport\.xml$/i
  },
  CuelistXML: {
    Name: 'Cuelists',
    Picture: '<svg viewBox="0 0 24 24"><title>Choose Cuelist file or drag it here</title><path d="M3 3v2h2V3H3zm4 0v2h6V3H7zm8 0v2h2V3h-2zm4 0v2h2V3h-2zM3 7v2h2V7H3zm4 0v2h6V7H7zm12 0v2h2V7h-2zM3 11v2h2v-2H3zm4 0v2h6v-2H7zm8 0v2h2v-2h-2zm4 0v2h2v-2h-2zM3 15v2h2v-2H3zm4 0v2h6v-2H7zm12 0v2h2v-2h-2zM3 19v2h2v-2H3zm4 0v2h6v-2H7zm12 0v2h2v-2h-2z"/></svg>',
    FileExt: '.OnyxCuelistReport.xml',
    Regex: /\.onyxcuelistreport\.xml$/i
  }
}
