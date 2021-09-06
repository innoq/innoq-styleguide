export default class TouchDetection extends HTMLElement {
  connectedCallback () {
    window.addEventListener('touchstart', function touched () {
      this.classList.add('instructions--touch--active')
      window.removeEventListener('touchstart', touched, false)
    }, false)
  }
}
