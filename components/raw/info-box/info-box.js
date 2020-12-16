export default class InfoBox extends HTMLElement {
  connectedCallback () {
    this.classList.add('enhanced')
    this.setAttribute('open', 'false')
    this.contentHeight = `${this.content.clientHeight}px`
    this.content.style.height = 0
    this.teaser.onclick = this.toggle.bind(this)
  }

  get content () {
    return this.querySelector('.infobox__content')
  }

  get teaser () {
    return this.querySelector('.infobox__teaser')
  }

  toggle () {
    this.open = !this.open

    if (this.open) {
      this.content.style.height = this.contentHeight
    } else {
      this.content.style.height = 0
    }
  }

  get open () {
    return this.getAttribute('open') === 'true'
  }

  set open (value) {
    this.setAttribute('open', value.toString())
  }
}
