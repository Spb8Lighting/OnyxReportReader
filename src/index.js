import Input from './input'
import LStorage from './localstorage'
import PatchRender from './render/patch'

// Change the form label by their associated picture
Input()

if(LStorage.Get({ key: 'FilePatch' })) {
    PatchRender()
}