import AudioPlayer from '../../components/05-atoms/media/audio-player/audio-player.js'
import CheckToToggle from '../../components/05-atoms/togglers/check-to-toggle/check-to-toggle.js'
import MultiToggler from '../../components/05-atoms/togglers/multi-toggler/multi-toggler.js'
import WallOfConsent from '../../components/04-molecules/wall-of-consent/wall-of-consent.js'
import Submenu from '../../components/03-organisms/navbar/submenu.js'
import MenuToggle from '../../components/03-organisms/navbar/menu-toggle.js'
// DEPRECATED: ClickableArea JavaScript is no longer needed (CSS-only solution in _clickable-area.scss)
// import ClickableArea from '../../components/05-atoms/clickable-area/clickable-area.js'
import TouchDetection from '../../components/04-molecules/slider/touch-detection.js'
import AutoSubmitForm from '../../components/04-molecules/filter/filter.js'

customElements.define('check-to-toggle', CheckToToggle)
customElements.define('multi-toggler', MultiToggler)
customElements.define('sub-menu', Submenu)
customElements.define('menu-toggle', MenuToggle)
customElements.define('wall-of-consent', WallOfConsent)
// DEPRECATED: ClickableArea JavaScript is no longer needed (CSS-only solution in _clickable-area.scss)
// customElements.define('clickable-area', ClickableArea)
customElements.define('touch-detection', TouchDetection)
customElements.define('auto-submit-form', AutoSubmitForm)
customElements.define('audio-player', AudioPlayer)
