export default class CheckToToggle extends HTMLElement {
  connectedCallback() {
    this.checkbox.onclick = this.toggle.bind(this)
  }

  disconnectedCallback() {
    if (this.checkbox) this.checkbox.onclick = null
  }

  get checkbox() {
    return this.querySelector('input[type="checkbox"]')
  }

  get target() {
    const selector = this.getAttribute('target')
    return document.querySelector(selector)
  }

  toggle() {
    this.target.classList.toggle('is-hidden')
  }
}
