export default class MultiToggler extends HTMLElement {
  connectedCallback () {
    this.toggleClass = this.getAttribute('data-toggle-class')
    this.toggleTargets = Array.from(document.querySelectorAll(this.getAttribute('data-target')))
    this.onclick = this.toggle.bind(this)
    this.classList.add('enhanced')
  }

  toggle () {
    this.toggleTargets.forEach(
      target => target.classList.toggle(this.toggleClass)
    )
    this.toggleSelf()
  }

  toggleSelf () {
    if (this.getAttribute('toggled') !== null) {
      this.removeAttribute('toggled')
    } else {
      this.setAttribute('toggled')
    }
  }
}

customElements.define('multi-toggler', MultiToggler)
