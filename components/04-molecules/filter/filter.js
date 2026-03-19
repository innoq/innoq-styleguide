export default class AutoSubmitForm extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector('form')
    if (!form) return
    form.onchange = () => form.submit()
    this.classList.add('enhanced')
  }

  disconnectedCallback() {
    const form = this.querySelector('form')
    if (form) form.onchange = null
    this.classList.remove('enhanced')
  }
}
