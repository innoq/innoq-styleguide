const EVENT_NAME = 'embeds-consent'
const STORAGE = 'consent-to-embeds'

export default class WallOfConsent extends HTMLElement {
  connectedCallback () {
    this.content = document.createElement('div')

    if (localStorage.getItem(STORAGE) === '1') {
      this.revealContent()
    }

    this.checkbox.addEventListener('change', this.onToggle.bind(this))
    this.toggleContent = this.toggleContent.bind(this)
    document.body.addEventListener(EVENT_NAME, this.toggleContent)
  }

  disconnectedCallback () {
    document.body.removeEventListener(EVENT_NAME, this.toggleContent)
  }

  onToggle (event) {
    if (event.target.checked) {
      localStorage.setItem(STORAGE, '1')
    } else {
      localStorage.removeItem(STORAGE)
    }

    const ev = new Event(EVENT_NAME)
    document.body.dispatchEvent(ev)
  }

  toggleContent () {
    if (localStorage.getItem(STORAGE) === '1') {
      this.revealContent()
    } else {
      this.removeContent()
    }
  }

  revealContent () {
    const template = this.querySelector('template')
    const templateContent = template.content

    this.content.replaceChildren(templateContent.cloneNode(true))
    this.prepend(this.content)
    this.toggleInitialElements(true)
    this.checkbox.checked = true
  }

  removeContent () {
    this.content.innerHTML = ''
    this.toggleInitialElements(false)
    this.checkbox.checked = false
  }

  toggleInitialElements (hidden) {
    this.querySelectorAll('[data-hide-if-consent]').forEach((node) => {
      node.hidden = hidden
    })
  }

  get checkbox () {
    return this.querySelector('input[type=checkbox]')
  }
}
