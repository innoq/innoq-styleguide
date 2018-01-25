export default class MultiToggler extends HTMLElement {
  connectedCallback () {
    let targetSelector = this.getAttribute('data-target')
    let hasNextElementSiblingTarget = this.hasAttribute('data-target-next')
    this.toggleClass = this.getAttribute('data-toggle-class')
    let initClass = this.getAttribute('data-init-class')
    let toggleOnInit = this.hasAttribute('data-toggle-on-init')
    this.toggleSelfClass = this.getAttribute('data-toggle-self-class')
    let initSelfClass = this.getAttribute('data-init-self-class')

    this.targtElements = []
    if (targetSelector) {
      this.targtElements.push(Array.from(document.querySelectorAll(targetSelector)))
    }
    if (hasNextElementSiblingTarget) {
      this.targtElements.push(this.nextElementSibling)
    }
    if (toggleOnInit) {
      this.toggle()
    }
    if (initClass) {
      this.toggleTargets(initClass)
    }
    if (initSelfClass) {
      this.classList.add(initSelfClass)
    }
    this.onclick = this.toggle.bind(this)
  }

  toggle () {
    this.toggleTargets(this.toggleClass)
  }

  toggleTargets (className) {
    if (this.targtElements[0]) {
      this.targtElements.forEach(
        target => target.classList.toggle(className)
      )
      this.toggleSelf()
    }
  }

  toggleSelf () {
    if (this.toggleSelfClass) {
      this.classList.toggle(this.toggleSelfClass)
    }
  }
}
