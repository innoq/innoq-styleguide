export default class TouchDetection extends HTMLElement {
  connectedCallback() {
    if (document.body.classList.contains('instructions--touch-active')) return
    this._touchHandler = () => {
      document.body.classList.add('instructions--touch-active')
      window.removeEventListener('touchstart', this._touchHandler, false)
    }
    window.addEventListener('touchstart', this._touchHandler, false)
  }

  disconnectedCallback() {
    window.removeEventListener('touchstart', this._touchHandler, false)
  }
}
