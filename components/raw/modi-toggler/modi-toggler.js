/**
 * todo:
 *    - separate selectable elements and classNames
 */
export default class ModiToggler extends HTMLElement {
  connectedCallback() {
    this.toggleModifier = this.getAttribute('data-toggle-modifier')
    this.toggleTargets = this.makeToggleTargets(this.getAttribute('data-target'), this.toggleModifier)
    this.onclick = this.toggle.bind(this)
    this.classList.add('enhanced')
  }

  toggle() {
    this.targets.forEach((target) => target.element.classList.toggle(target.toggleClass))
    this.toggleSelf()
  }

  toggleSelf() {
    if (this.getAttribute('toggled') !== null) {
      this.removeAttribute('toggled')
    } else {
      this.setAttribute('toggled')
    }
  }

  makeToggleTargets(targetString, toggleModifier) {
    return targetString
      .split(',')
      .map((s) => s.trim())
      .reduce((acc, selector) => {
        if (/-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(selector)) {
          // test if valid single class
          acc.push({
            element: document.querySelector(selector),
            toggleClass: selector + '--' + toggleModifier,
          })
        }
        return acc
      }, [])
  }
}
