export default class MultiToggler extends HTMLElement {
  connectedCallback () {
    const targetSelector = this.getAttribute('data-target')
    const hasNextElementSiblingTarget = this.hasAttribute('data-target-next')
    this.toggleClass = this.getAttribute('data-toggle-class')
    const initClass = this.getAttribute('data-init-class')
    const toggleOnInit = this.hasAttribute('data-toggle-on-init')
    this.toggleSelfClass = this.getAttribute('data-toggle-self-class')
    const initSelfClass = this.getAttribute('data-init-self-class')

    this.targetElements = []
    if (targetSelector) {
      this.targetElements.push(Array.from(document.querySelectorAll(targetSelector)))
    }
    if (hasNextElementSiblingTarget) {
      this.targetElements.push(this.nextElementSibling)
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
    if (this.targetElements[0]) {
      this.targetElements.forEach(
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
