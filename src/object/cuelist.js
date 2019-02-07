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
    this.BackTrack = Boolean(CuelistXML.getAttribute('backTrack'))
    this.AutoRelease = Boolean(CuelistXML.getAttribute('autoRelease'))
    this.ReleaseOnNextGo = Boolean(CuelistXML.getAttribute('releaseOnNextGo'))
    this.ReleaseWhenRestart = Boolean(CuelistXML.getAttribute('releasewhenRestart'))
    this.ResetWhenReleased = Boolean(CuelistXML.getAttribute('ResetWhenReleased'))
    this.DefaultReleaseTime = Number(CuelistXML.getAttribute('defaultReleaseTime'))
    this.ReleaseDimmersFirst = Boolean(CuelistXML.getAttribute('releaseDimmersFirst'))
    this.IgnoreGlobalRelease = Boolean(CuelistXML.getAttribute('ignoreGlobalRelease'))
    this.DefaultFaderValue = Boolean(CuelistXML.getAttribute('defaultFaderValue'))
    this.EndOfCuelist = Number(CuelistXML.getAttribute('endOfCuelist'))
    this.FaderTriggerLevel = Boolean(CuelistXML.getAttribute('faderTriggerLevel'))
    this.GoExitLink = Boolean(CuelistXML.getAttribute('GoExitLink'))
    this.Tracking = Boolean(CuelistXML.getAttribute('tracking'))
    this.MarkMode = CuelistXML.getAttribute('markMode') || false
    let OtherAttributes = this.CheckChild(CuelistXML)
    this.Cues = OtherAttributes.Cues
    this.PlaybackFader = OtherAttributes.PlaybackFaders
    this.PlaybackButtons = OtherAttributes.PlaybackButtons
    this.AnalogFaders = OtherAttributes.AnalogFaders
  }
  CheckChild (CuelistXML) {
    let Cues = []
    let PlaybackFaders = []
    let PlaybackButtons = []
    let AnalogFaders = []
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
            Cue.UsesBase = Boolean(Children[i].getAttribute('usesBase'))
            Cue.UsesFx = Boolean(Children[i].getAttribute('usesFx'))
            Cue.UsesTiming = Boolean(Children[i].getAttribute('usesTiming'))
            Cue.FadeMode = Children[i].getAttribute('fadeMode') || false
            Cue.Trigger = Children[i].getAttribute('trigger') || false
            Cue.Delay = Children[i].getAttribute('delay') || false
            Cue.Fade = Children[i].getAttribute('fade') || false
            Cue.MarkCue = Boolean(Children[i].getAttribute('markCue'))
            Cue.TimeCode = Children[i].getAttribute('timeCode') || false
            Cues.push(Cue)
            break
          case 'PlayBackFader':
            let PlaybackFader = {}
            PlaybackFader.Page = Number(Children[i].getAttribute('playbackPage'))
            PlaybackFader.Number = Number(Children[i].getAttribute('playbackNumber'))
            PlaybackFader.BankName = Children[i].getAttribute('playbackBankName') || false
            PlaybackFaders.push(PlaybackFader)
            break
          case 'PlaybackButton':
            let PlaybackButton = {}
            PlaybackButton.Page = Number(Children[i].getAttribute('playbackPage'))
            PlaybackButton.Number = Number(Children[i].getAttribute('buttonPosition'))
            PlaybackButtons.push(PlaybackButton)
            break
          case 'AnalogFader':
            let AnalogFader = {}
            AnalogFader.Page = Number(Children[i].getAttribute('playbackPage'))
            AnalogFader.Number = Number(Children[i].getAttribute('buttonPosition'))
            AnalogFaders.push(AnalogFader)
            break
        }
      }
    }
    return { Cues: Cues, PlaybackFaders: PlaybackFaders, PlaybackButtons: PlaybackButtons, AnalogFaders: AnalogFaders }
  }
}
