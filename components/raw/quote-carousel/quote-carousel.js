export default class QuoteCarousel extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector('[data-carousel-track]')
    this.items = [...this.track.children]
    if (this.items.length <= 1) return

    this.querySelector('.quote-carousel__nav')?.remove()
    this.currentIndex = 0
    this.createControls()
    this.observeScroll()
  }

  disconnectedCallback() {
    this._observer?.disconnect()
    this._observer = null
    this.querySelector('.quote-carousel__nav')?.remove()
  }

  createControls() {
    const nav = document.createElement('nav')
    nav.setAttribute('aria-label', 'Zitate Navigation')
    nav.classList.add('quote-carousel__nav')

    const prevBtn = document.createElement('button')
    prevBtn.setAttribute('aria-label', 'Vorheriges Zitat')
    prevBtn.classList.add('quote-carousel__btn', 'quote-carousel__btn--prev')
    prevBtn.textContent = '\u2190'
    prevBtn.addEventListener('click', () => this.go(-1))

    const nextBtn = document.createElement('button')
    nextBtn.setAttribute('aria-label', 'Nächstes Zitat')
    nextBtn.classList.add('quote-carousel__btn', 'quote-carousel__btn--next')
    nextBtn.textContent = '\u2192'
    nextBtn.addEventListener('click', () => this.go(1))

    const dots = document.createElement('div')
    dots.classList.add('quote-carousel__dots')
    dots.setAttribute('role', 'tablist')
    this.items.forEach((_, i) => {
      const dot = document.createElement('button')
      dot.classList.add('quote-carousel__dot')
      dot.setAttribute('role', 'tab')
      dot.setAttribute('aria-label', `Zitat ${i + 1}`)
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false')
      dot.addEventListener('click', () => this.goTo(i))
      dots.appendChild(dot)
    })

    nav.appendChild(prevBtn)
    nav.appendChild(dots)
    nav.appendChild(nextBtn)
    this.appendChild(nav)

    this.prevBtn = prevBtn
    this.nextBtn = nextBtn
    this.dots = [...dots.children]
    this.updateControls()
  }

  observeScroll() {
    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.currentIndex = this.items.indexOf(entry.target)
            this.updateControls()
          }
        }
      },
      { root: this.track, threshold: 0.5 },
    )
    this.items.forEach((item) => this._observer.observe(item))
  }

  go(direction) {
    this.goTo(this.currentIndex + direction)
  }

  goTo(index) {
    const target = this.items[Math.max(0, Math.min(index, this.items.length - 1))]
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  updateControls() {
    this.prevBtn.disabled = this.currentIndex === 0
    this.nextBtn.disabled = this.currentIndex === this.items.length - 1
    this.dots.forEach((dot, i) => {
      dot.setAttribute('aria-selected', i === this.currentIndex ? 'true' : 'false')
    })
  }
}
