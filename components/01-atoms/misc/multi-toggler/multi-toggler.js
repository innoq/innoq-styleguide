export default class MultiToggler extends HTMLElement {
  connectedCallback () {
    let targetSelector = this.getAttribute('data-target')
    this.toggleClass = this.getAttribute('data-toggle-class')
    if (targetSelector === '') {
      this.toggleTargets = undefined
    } else {
      this.toggleTargets = Array.from(document.querySelectorAll(targetSelector))
    }
    this.onclick = this.toggle.bind(this)
    this.classList.add('enhanced')
  }

  toggle () {
    if (this.toggleTargets) {
      this.toggleTargets.forEach(
        target => target.classList.toggle(this.toggleClass)
      )
      this.toggleSelf()
    }
  }

  toggleSelf () {
    if (this.toggleTargets) {
      if (this.getAttribute('toggled') !== null) {
        this.removeAttribute('toggled')
      } else {
        this.setAttribute('toggled', '')
      }
    }
  }
}
