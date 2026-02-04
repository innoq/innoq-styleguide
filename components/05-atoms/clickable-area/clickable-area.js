// DEPRECATED: This JavaScript implementation is no longer needed.
// The clickable-area functionality is now implemented purely with CSS.
// See _clickable-area.scss for the CSS-only solution.
//
// This file is kept for backwards compatibility but will be removed in a future version.
// You can safely stop registering this custom element.
//
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
