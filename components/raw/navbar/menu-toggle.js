export default class MenuToggle extends HTMLElement {
  connectedCallback() {
    if (!this.button) {
      return
    }

    this.hidden = false
    this.button.type = 'button'
    this.button.onclick = () => this.toggle()
    this.toggle(false)
  }

  disconnectedCallback() {
    if (this.button) this.button.onclick = null
    this.hidden = true
  }

  toggle(expanded = !(this.button.getAttribute('aria-expanded') === 'true')) {
    let button = this.button
    button.setAttribute('aria-expanded', expanded)
    this.navbar.setAttribute('data-expanded', expanded)
  }

  get button() {
    return this.querySelector('button')
  }

  get navbar() {
    return this.closest('nav')
  }
}
