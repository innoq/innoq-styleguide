export default class TouchDetection extends HTMLElement {
  connectedCallback() {
    function touched() {
      document.body.classList.add('instructions--touch-active')
      window.removeEventListener('touchstart', touched, false)
    }

    window.addEventListener('touchstart', touched, false)
  }
}
