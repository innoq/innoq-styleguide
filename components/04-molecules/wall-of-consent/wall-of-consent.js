export default class WallOfConsent extends HTMLElement {
  connectedCallback() {
    this.content = document.createElement('div')

    if (localStorage.getItem(this.localStorageName) === '1') {
      this.revealContent()
    }

    this._onToggle = this.onToggle.bind(this)
    this.checkbox.addEventListener('change', this._onToggle)
    this.toggleContent = this.toggleContent.bind(this)
    document.body.addEventListener(this.eventName, this.toggleContent)
  }

  disconnectedCallback() {
    this.checkbox?.removeEventListener('change', this._onToggle)
    document.body.removeEventListener(this.eventName, this.toggleContent)
    this.content?.remove()
    this.classList.remove('revealed')
    this.toggleInitialElements(false)
  }

  onToggle(event) {
    if (event.target.checked) {
      localStorage.setItem(this.localStorageName, '1')
    } else {
      localStorage.removeItem(this.localStorageName)
    }

    const ev = new Event(this.eventName)
    document.body.dispatchEvent(ev)
  }

  toggleContent() {
    if (localStorage.getItem(this.localStorageName) === '1') {
      this.revealContent()
    } else {
      this.removeContent()
    }
  }

  revealContent() {
    const template = this.querySelector('template')
    const templateContent = template.content

    this.content.replaceChildren(templateContent.cloneNode(true))
    this.prepend(this.content)
    this.toggleInitialElements(true)
    this.checkbox.checked = true
    this.classList.add('revealed')
  }

  removeContent() {
    this.content.innerHTML = ''
    this.toggleInitialElements(false)
    this.checkbox.checked = false
    this.classList.remove('revealed')
  }

  toggleInitialElements(hidden) {
    this.querySelectorAll('[data-hide-if-consent]').forEach((node) => {
      node.hidden = hidden
    })
  }

  get checkbox() {
    return this.querySelector('input[type=checkbox]')
  }

  get eventName() {
    return `embeds-consent-from-${this.getAttribute('type')}`
  }

  get localStorageName() {
    return `consent-to-embeds-from-${this.getAttribute('type')}`
  }
}
