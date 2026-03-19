// Co-authored-by: FND <fnd@innoq.com>
export default class AudioPlayer extends HTMLElement {
  connectedCallback() {
    const fragment = this.template
    this._addedNodes = [...fragment.childNodes]
    this.appendChild(fragment)
    this.rate = this.slider.value

    this.addEventListener('change', this.onTune)
    this.addEventListener('click', this.onSeek)
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.onTune)
    this.removeEventListener('click', this.onSeek)
    this._addedNodes?.forEach((node) => node.remove())
    this._addedNodes = null
  }

  onTune(ev) {
    const { slider } = this
    if (ev.target === slider) {
      // event delegation
      this.rate = slider.value
    }
  }

  onSeek(ev) {
    const btn = ev.target
    if (!btn.matches('button[name]')) {
      // event delegation
      return
    }

    let value = parseInt(btn.value, 10)
    if (btn.name === 'rewind') {
      value = value * -1
    }
    this._player.currentTime += value
  }

  get slider() {
    return this.querySelector('input[type=range]')
  }

  set rate(value) {
    this._player.playbackRate = value
    this._rate.textContent = value
  }

  get _rate() {
    return this.querySelector('var')
  }

  get _player() {
    return this.querySelector('audio')
  }

  get template() {
    return this.querySelector('template').content.cloneNode(true)
  }
}
