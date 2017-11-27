export default class NavbarToggler extends HTMLElement {
  connectedCallback () {
    this.classList.add('enhanced')
    this.onclick = this.toggle.bind(this)
  }

  toggle () {
    this.open = !this.open
    const targets = Array.from(this.target)
    targets.forEach((t) => t.classList.toggle('collapse'))
  }

  get target () {
    const selector = this.getAttribute('target')
    return document.querySelectorAll(selector)
  }

  get open () {
    return this.getAttribute('open') === ''
  }

  set open (opened) {
    if (opened) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }
}
