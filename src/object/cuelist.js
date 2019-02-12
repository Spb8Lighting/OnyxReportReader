const StingToBool = Val => {
  if (typeof Val === 'string') {
    switch (Val.toLowerCase().trim()) {
      case 'true':
      case 'yes':
      case 1:
        return true
      case 'false':
      case 'no':
      case 0:
      case null:
        return false
      default:
        return Boolean(Val)
    }
  } else {
    return false
  }
}

class PhysicalObject {
  constructor (Obj) {
    this.PageBank = Number(Obj.PageBank) || false
    this.PageBankName = typeof Obj.PageBankName === 'undefined' ? false : String(Obj.PageBankName)
    this.Type = String(Obj.Type) || false
    this.Position = Number(Obj.Position) || false
  }
}

export default class CuelistObject {
  /**
   * Create a Cuelist Object
   * @param {XMLDocument} CuelistXML Complete XML file (patch one)
   */
  constructor (CuelistXML) {
    this.ID = Number(CuelistXML.getAttribute('visualId'))
    this.InternalID = Number(CuelistXML.getAttribute('internalId'))
    this.Name = CuelistXML.getAttribute('cuelistName') || false
    this.Type = CuelistXML.nodeName
    this.PriorityLevel = Number(CuelistXML.getAttribute('priorityLevel'))
    this.BackTrack = StingToBool(CuelistXML.getAttribute('backTrack'))
    this.AutoRelease = StingToBool(CuelistXML.getAttribute('autoRelease'))
    this.ReleaseOnNextGo = StingToBool(CuelistXML.getAttribute('releaseOnNextGo'))
    this.ReleaseWhenRestart = StingToBool(CuelistXML.getAttribute('releasewhenRestart'))
    this.ResetWhenReleased = StingToBool(CuelistXML.getAttribute('ResetWhenReleased'))
    this.DefaultReleaseTime = Number(CuelistXML.getAttribute('defaultReleaseTime'))
    this.ReleaseDimmersFirst = StingToBool(CuelistXML.getAttribute('releaseDimmersFirst'))
    this.IgnoreGlobalRelease = StingToBool(CuelistXML.getAttribute('ignoreGlobalRelease'))
    this.DefaultFaderValue = StingToBool(CuelistXML.getAttribute('defaultFaderValue'))
    this.EndOfCuelist = Number(CuelistXML.getAttribute('endOfCuelist'))
    this.FaderTriggerLevel = StingToBool(CuelistXML.getAttribute('faderTriggerLevel'))
    this.GoExitLink = StingToBool(CuelistXML.getAttribute('GoExitLink'))
    this.Tracking = StingToBool(CuelistXML.getAttribute('tracking'))
    this.MarkMode = CuelistXML.getAttribute('markMode') || false
    let OtherAttributes = this.CheckChild(CuelistXML)
    this.Cues = OtherAttributes.Cues
    this.Physicals = OtherAttributes.Physicals.length > 0 ? OtherAttributes.Physicals : false
  }
  CheckChild (CuelistXML) {
    let Cues = []
    let Physicals = []
    let Children = CuelistXML.children
    for (let i = 0; i < Children.length; i++) {
      if (Children.hasOwnProperty(i)) {
        switch (Children[i].nodeName) {
          case 'Cue':
            let Cue = {}
            Cue.InternalRowId = Number(Children[i].getAttribute('internalRowId'))
            Cue.ID = Number(Children[i].getAttribute('cueId'))
            Cue.Name = Children[i].getAttribute('cueName') || false
            Cue.Comment = Children[i].getAttribute('comment') || false
            Cue.UsesBase = StingToBool(Children[i].getAttribute('usesBase'))
            Cue.UsesFx = StingToBool(Children[i].getAttribute('usesFx'))
            Cue.UsesTiming = StingToBool(Children[i].getAttribute('usesTiming'))
            Cue.FadeMode = Children[i].getAttribute('fadeMode') || false
            Cue.Trigger = Children[i].getAttribute('trigger') || false
            Cue.Delay = Children[i].getAttribute('delay') || false
            Cue.Fade = Children[i].getAttribute('fade') || false
            Cue.MarkCue = StingToBool(Children[i].getAttribute('markCue'))
            Cue.TimeCode = Children[i].getAttribute('timeCode') || false
            Cues.push(Cue)
            break
          case 'PlayBackFader':
            // Main Playback Fader
            let MainPlaybackFader = {}
            MainPlaybackFader.PageBank = Children[i].getAttribute('playbackPage')
            MainPlaybackFader.Position = Children[i].getAttribute('playbackNumber')
            MainPlaybackFader.PageBankName = Children[i].getAttribute('playbackBankName')
            MainPlaybackFader.Type = 'MainPlaybackFader'
            Physicals.push(new PhysicalObject(MainPlaybackFader))
            break
          case 'PlaybackButton':
            let PlaybackButton = {}
            PlaybackButton.PageBank = Children[i].getAttribute('playbackPage')
            PlaybackButton.Position = Children[i].getAttribute('buttonPosition')
            PlaybackButton.Type = 'PlaybackButton'
            Physicals.push(new PhysicalObject(PlaybackButton))
            break
          case 'AnalogFader':
            let SubmasterPlayback = {}
            SubmasterPlayback.PageBank = Children[i].getAttribute('playbackPage')
            SubmasterPlayback.Position = Children[i].getAttribute('buttonPosition')
            SubmasterPlayback.Type = 'SubmasterPlayback'
            Physicals.push(new PhysicalObject(SubmasterPlayback))
            break
        }
      }
    }
    return { Cues: Cues, Physicals: Physicals }
  }
}
