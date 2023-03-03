export default class AutoSubmitForm extends HTMLElement {
  connectedCallback() {
    let form = this.querySelector('form')
    form.addEventListener('change', form.submit)
    this.classList.add('enhanced')
  }
}
