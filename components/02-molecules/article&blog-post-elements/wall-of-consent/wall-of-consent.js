export default class WallOfConsent extends HTMLElement {
  connectedCallback () {
    this.content = document.createElement('div')

    if (localStorage.getItem('consent-to-embeds') === '1') {
      this.revealContent()
      this.hideInitialElements()
      this.checkbox.setAttribute('checked', '')
    }

    this.checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem('consent-to-embeds', '1')
        this.revealContent()
        this.hideInitialElements()
      } else {
        localStorage.removeItem('consent-to-embeds')
        this.removeContent()
        this.unhideInitialElements()
      }
    })
  }

  get checkbox () {
    return this.querySelector('input[type=checkbox]')
  }

  revealContent () {
    const template = this.querySelector('template')
    const templateContent = template.content

    this.content.append(templateContent.cloneNode(true))
    this.prepend(this.content)
  }

  removeContent () {
    this.content.innerHTML = ''
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
