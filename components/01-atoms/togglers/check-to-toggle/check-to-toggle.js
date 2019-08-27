export default class CheckToToggle extends HTMLElement {
  connectedCallback () {
    this.checkbox.onclick = this.toggle.bind(this)
  }

  get checkbox () {
    return this.querySelector('input[type="checkbox"]')
  }

  get target () {
    const selector = this.getAttribute('target')
    return document.querySelector(selector)
  }

  toggle () {
    if (this.checkbox.checked) {
      this.target.classList.add('hidden')
    } else {
      this.target.classList.remove('hidden')
    }
  }
}
