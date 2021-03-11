export default class WallOfConsent extends HTMLElement {
  connectedCallback () {
    this.content = document.createElement('div')

    if (localStorage.getItem('consent-to-embeds') === '1') {
      this.revealContent()
      this.checkbox.setAttribute('checked', '')
    }

    this.checkbox.addEventListener('change', this.toggle.bind(this))

    document.body.addEventListener('consent-to-embeds', this.revealContent.bind(this))
    document.body.addEventListener('disconsent-to-embeds', this.removeContent.bind(this))
  }

  get checkbox () {
    return this.querySelector('input[type=checkbox]')
  }

  revealContent () {
    const template = this.querySelector('template')
    const templateContent = template.content

    this.content.replaceChildren(templateContent.cloneNode(true))
    this.prepend(this.content)
    this.hideInitialElements()
    this.checkbox.checked = true
  }

  removeContent () {
    this.content.innerHTML = ''
    this.unhideInitialElements()
    this.checkbox.checked = false
  }

  toggle (event) {
    if (event.target.checked) {
      localStorage.setItem('consent-to-embeds', '1')
      const event = new Event('consent-to-embeds')
      document.body.dispatchEvent(event)
      this.revealContent()
    } else {
      localStorage.removeItem('consent-to-embeds')
      const event = new Event('disconsent-to-embeds')
      document.body.dispatchEvent(event)
      this.removeContent()
    }
  }

  hideInitialElements () {
    this.querySelectorAll('[data-hide-if-consent]').forEach((node) => {
      node.hidden = true
    })
  }

  unhideInitialElements () {
    this.querySelectorAll('[data-hide-if-consent]').forEach((node) => {
      node.hidden = false
    })
  }
}
