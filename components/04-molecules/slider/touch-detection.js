const FULLSCREEN_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" width="20" height="20"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>'

const EXIT_FULLSCREEN_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" width="20" height="20"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>'

export default class TouchDetection extends HTMLElement {
  connectedCallback() {
    if (!document.body.classList.contains('instructions--touch-active')) {
      this._touchHandler = () => {
        document.body.classList.add('instructions--touch-active')
        window.removeEventListener('touchstart', this._touchHandler, false)
      }
      window.addEventListener('touchstart', this._touchHandler, false)
    }

    this._addLoadingSpinners()
    this._addFullscreenButton()
  }

  disconnectedCallback() {
    if (this._touchHandler) {
      window.removeEventListener('touchstart', this._touchHandler, false)
    }
    if (this._fullscreenHandler) {
      document.removeEventListener('fullscreenchange', this._fullscreenHandler)
    }
  }

  _addLoadingSpinners() {
    this.querySelectorAll('.slider__slide').forEach((slide) => {
      const img = slide.querySelector('img')
      if (!img) return

      const spinner = document.createElement('div')
      spinner.className = 'slider__spinner'
      spinner.setAttribute('aria-hidden', 'true')
      slide.appendChild(spinner)

      if (img.complete && img.naturalWidth > 0) {
        spinner.remove()
      } else {
        const done = () => spinner.remove()
        img.addEventListener('load', done, { once: true })
        img.addEventListener('error', done, { once: true })
      }
    })
  }

  _addFullscreenButton() {
    if (!document.fullscreenEnabled) return

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'slider__fullscreen-btn'
    btn.setAttribute('aria-label', this.dataset.fullscreenLabel || 'Fullscreen')
    btn.innerHTML = FULLSCREEN_ICON
    this.appendChild(btn)

    btn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        this.requestFullscreen().catch(() => {})
      }
    })

    this._fullscreenHandler = () => {
      const isFs = document.fullscreenElement === this
      btn.innerHTML = isFs ? EXIT_FULLSCREEN_ICON : FULLSCREEN_ICON
      btn.setAttribute(
        'aria-label',
        isFs ? this.dataset.exitFullscreenLabel || 'Exit fullscreen' : this.dataset.fullscreenLabel || 'Fullscreen',
      )
    }
    document.addEventListener('fullscreenchange', this._fullscreenHandler)
  }
}
