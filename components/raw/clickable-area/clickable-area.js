// following advice from https://inclusive-components.design/cards
export default class ClickableArea extends HTMLElement {
  connectedCallback() {
    if (this.link) {
      this.addEventListener('mousedown', this.handleMousedown.bind(this))
      this.addEventListener('mouseup', this.handleMouseup.bind(this))
      this.style.cursor = 'pointer'
    }
  }

  handleMousedown({ timeStamp }) {
    this.down = timeStamp
  }

  handleMouseup({ timeStamp }) {
    if (timeStamp - this.down < 200) {
      this.link.click()
    }
  }

  get link() {
    return this.querySelector('a')
  }
}
