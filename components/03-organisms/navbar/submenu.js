export default class Submenu extends HTMLElement {
  connectedCallback() {
    let summary = this.querySelector('summary')
    let ul = this.querySelector('ul')

    if (!summary || !ul) {
      if (this.button) this._attachListeners()
      return
    }

    // With out method of animating the collapsing/expanding of the menu, it is
    // necessary to wrap the content of the menu in a `<div>`
    this.innerHTML = `<button type="button" aria-expanded="false">${summary.innerHTML}</button><div>${ul.outerHTML}</div>`
    this._attachListeners()
    this.toggle(false)
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this._clickHandler)
    this.navigation?.removeEventListener('submenu-toggle', this._submenuToggleHandler)
    this._clickHandler = null
    this._submenuToggleHandler = null
  }

  _attachListeners() {
    this._clickHandler = () => this.toggle()
    this.button.addEventListener('click', this._clickHandler)
    this._submenuToggleHandler = (ev) => {
      if (ev.detail && ev.detail.expanded && ev.target !== this.button) {
        if (this.button.getAttribute('aria-expanded') === 'true') {
          this.toggle(false)
        }
      }
    }
    this.navigation.addEventListener('submenu-toggle', this._submenuToggleHandler)
  }

  toggle(expanded = !(this.button.getAttribute('aria-expanded') === 'true')) {
    let button = this.button
    button.setAttribute('aria-expanded', expanded)
    button.dispatchEvent(new CustomEvent('submenu-toggle', { detail: { expanded }, bubbles: true }))
  }

  get navigation() {
    return this.closest('ul')
  }

  get button() {
    return this.querySelector('button')
  }

  get div() {
    return this.querySelector('div')
  }

  get ul() {
    return this.querySelector('ul')
  }
}
