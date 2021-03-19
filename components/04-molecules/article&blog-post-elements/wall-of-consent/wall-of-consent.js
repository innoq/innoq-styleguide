const EVENT_NAME = 'embeds-consent'

export default class WallOfConsent extends HTMLElement {
  connectedCallback () {
    this.content = document.createElement('div')

    if (localStorage.getItem('consent-to-embeds') === '1') {
      this.revealContent()
    }

    this.checkbox.addEventListener('change', this.toggle.bind(this))
    this.toggleContent = this.toggleContent.bind(this)
    document.body.addEventListener(EVENT_NAME, this.toggleContent)
  }

  disconnectedCallback () {
    document.body.removeEventListener(EVENT_NAME, this.toggleContent)
  }

  toggleContent () {
    if (localStorage.getItem('consent-to-embeds') === '1') {
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

  toggle (event) {
    if (event.target.checked) {
      localStorage.setItem('consent-to-embeds', '1')
    } else {
      localStorage.removeItem('consent-to-embeds')
    }

    const ev = new Event(EVENT_NAME)
    document.body.dispatchEvent(ev)
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
