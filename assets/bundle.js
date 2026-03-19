// Co-authored-by: FND <fnd@innoq.com>
class AudioPlayer extends HTMLElement {
  connectedCallback() {
    const fragment = this.template;
    this._addedNodes = [...fragment.childNodes];
    this.appendChild(fragment);
    this.rate = this.slider.value;

    this.addEventListener('change', this.onTune);
    this.addEventListener('click', this.onSeek);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.onTune);
    this.removeEventListener('click', this.onSeek);
    this._addedNodes?.forEach((node) => node.remove());
    this._addedNodes = null;
  }

  onTune(ev) {
    const { slider } = this;
    if (ev.target === slider) {
      // event delegation
      this.rate = slider.value;
    }
  }

  onSeek(ev) {
    const btn = ev.target;
    if (!btn.matches('button[name]')) {
      // event delegation
      return
    }

    let value = parseInt(btn.value, 10);
    if (btn.name === 'rewind') {
      value = value * -1;
    }
    this._player.currentTime += value;
  }

  get slider() {
    return this.querySelector('input[type=range]')
  }

  set rate(value) {
    this._player.playbackRate = value;
    this._rate.textContent = value;
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

class CheckToToggle extends HTMLElement {
  connectedCallback() {
    this.checkbox.onclick = this.toggle.bind(this);
  }

  disconnectedCallback() {
    if (this.checkbox) this.checkbox.onclick = null;
  }

  get checkbox() {
    return this.querySelector('input[type="checkbox"]')
  }

  get target() {
    const selector = this.getAttribute('target');
    return document.querySelector(selector)
  }

  toggle() {
    this.target.classList.toggle('is-hidden');
  }
}

class MultiToggler extends HTMLElement {
  connectedCallback() {
    const targetSelector = this.getAttribute('data-target');
    const hasNextElementSiblingTarget = this.hasAttribute('data-target-next');
    this.toggleClass = this.getAttribute('data-toggle-class');
    const initClass = this.getAttribute('data-init-class');
    const toggleOnInit = this.hasAttribute('data-toggle-on-init');
    this.toggleSelfClass = this.getAttribute('data-toggle-self-class');
    const initSelfClass = this.getAttribute('data-init-self-class');

    this.targetElements = [];
    if (targetSelector) {
      this.targetElements.push(Array.from(document.querySelectorAll(targetSelector)));
    }
    if (hasNextElementSiblingTarget) {
      this.targetElements.push(this.nextElementSibling);
    }
    if (toggleOnInit) {
      this.toggle();
    }
    if (initClass) {
      this.toggleTargets(initClass);
    }
    if (initSelfClass) {
      this.classList.add(initSelfClass);
    }
    this.onclick = this.toggle.bind(this);
  }

  disconnectedCallback() {
    this.onclick = null;
    const initSelfClass = this.getAttribute('data-init-self-class');
    if (initSelfClass) this.classList.remove(initSelfClass);
  }

  toggle() {
    this.toggleTargets(this.toggleClass);
  }

  toggleTargets(className) {
    if (this.targetElements[0]) {
      this.targetElements.forEach((target) => target.classList.toggle(className));
      this.toggleSelf();
    }
  }

  toggleSelf() {
    if (this.toggleSelfClass) {
      this.classList.toggle(this.toggleSelfClass);
    }
  }
}

class WallOfConsent extends HTMLElement {
  connectedCallback() {
    this.content = document.createElement('div');

    if (localStorage.getItem(this.localStorageName) === '1') {
      this.revealContent();
    }

    this._onToggle = this.onToggle.bind(this);
    this.checkbox.addEventListener('change', this._onToggle);
    this.toggleContent = this.toggleContent.bind(this);
    document.body.addEventListener(this.eventName, this.toggleContent);
  }

  disconnectedCallback() {
    this.checkbox?.removeEventListener('change', this._onToggle);
    document.body.removeEventListener(this.eventName, this.toggleContent);
    this.content?.remove();
    this.classList.remove('revealed');
    this.toggleInitialElements(false);
  }

  onToggle(event) {
    if (event.target.checked) {
      localStorage.setItem(this.localStorageName, '1');
    } else {
      localStorage.removeItem(this.localStorageName);
    }

    const ev = new Event(this.eventName);
    document.body.dispatchEvent(ev);
  }

  toggleContent() {
    if (localStorage.getItem(this.localStorageName) === '1') {
      this.revealContent();
    } else {
      this.removeContent();
    }
  }

  revealContent() {
    const template = this.querySelector('template');
    const templateContent = template.content;

    this.content.replaceChildren(templateContent.cloneNode(true));
    this.prepend(this.content);
    this.toggleInitialElements(true);
    this.checkbox.checked = true;
    this.classList.add('revealed');
  }

  removeContent() {
    this.content.innerHTML = '';
    this.toggleInitialElements(false);
    this.checkbox.checked = false;
    this.classList.remove('revealed');
  }

  toggleInitialElements(hidden) {
    this.querySelectorAll('[data-hide-if-consent]').forEach((node) => {
      node.hidden = hidden;
    });
  }

  get checkbox() {
    return this.querySelector('input[type=checkbox]')
  }

  get eventName() {
    return `embeds-consent-from-${this.getAttribute('type')}`
  }

  get localStorageName() {
    return `consent-to-embeds-from-${this.getAttribute('type')}`
  }
}

class Submenu extends HTMLElement {
  connectedCallback() {
    let summary = this.querySelector('summary');
    let ul = this.querySelector('ul');

    if (!summary || !ul) {
      if (this.button) this._attachListeners();
      return
    }

    // With out method of animating the collapsing/expanding of the menu, it is
    // necessary to wrap the content of the menu in a `<div>`
    this.innerHTML = `<button type="button" aria-expanded="false">${summary.innerHTML}</button><div>${ul.outerHTML}</div>`;
    this._attachListeners();
    this.toggle(false);
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this._clickHandler);
    this.navigation?.removeEventListener('submenu-toggle', this._submenuToggleHandler);
    this._clickHandler = null;
    this._submenuToggleHandler = null;
  }

  _attachListeners() {
    this._clickHandler = () => this.toggle();
    this.button.addEventListener('click', this._clickHandler);
    this._submenuToggleHandler = (ev) => {
      if (ev.detail && ev.detail.expanded && ev.target !== this.button) {
        if (this.button.getAttribute('aria-expanded') === 'true') {
          this.toggle(false);
        }
      }
    };
    this.navigation.addEventListener('submenu-toggle', this._submenuToggleHandler);
  }

  toggle(expanded = !(this.button.getAttribute('aria-expanded') === 'true')) {
    let button = this.button;
    button.setAttribute('aria-expanded', expanded);
    button.dispatchEvent(new CustomEvent('submenu-toggle', { detail: { expanded }, bubbles: true }));
  }

  get navigation() {
    return this.closest('ul')
  }

  get button() {
    return this.querySelector('button')
  }

  get div() {
    return this.querySelector('div')
  }

  get ul() {
    return this.querySelector('ul')
  }
}

class MenuToggle extends HTMLElement {
  connectedCallback() {
    if (!this.button) {
      return
    }

    this.hidden = false;
    this.button.type = 'button';
    this.button.onclick = () => this.toggle();
    this.toggle(false);
  }

  disconnectedCallback() {
    if (this.button) this.button.onclick = null;
    this.hidden = true;
  }

  toggle(expanded = !(this.button.getAttribute('aria-expanded') === 'true')) {
    let button = this.button;
    button.setAttribute('aria-expanded', expanded);
    this.navbar.setAttribute('data-expanded', expanded);
  }

  get button() {
    return this.querySelector('button')
  }

  get navbar() {
    return this.closest('nav')
  }
}

class TouchDetection extends HTMLElement {
  connectedCallback() {
    if (document.body.classList.contains('instructions--touch-active')) return
    this._touchHandler = () => {
      document.body.classList.add('instructions--touch-active');
      window.removeEventListener('touchstart', this._touchHandler, false);
    };
    window.addEventListener('touchstart', this._touchHandler, false);
  }

  disconnectedCallback() {
    window.removeEventListener('touchstart', this._touchHandler, false);
  }
}

class AutoSubmitForm extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector('form');
    if (!form) return
    form.onchange = () => form.submit();
    this.classList.add('enhanced');
  }

  disconnectedCallback() {
    const form = this.querySelector('form');
    if (form) form.onchange = null;
    this.classList.remove('enhanced');
  }
}

class QuoteCarousel extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector('[data-carousel-track]');
    this.items = [...this.track.children];
    if (this.items.length <= 1) return

    this.querySelector('.quote-carousel__nav')?.remove();
    this.currentIndex = 0;
    this.createControls();
    this.observeScroll();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
    this.querySelector('.quote-carousel__nav')?.remove();
  }

  createControls() {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Zitate Navigation');
    nav.classList.add('quote-carousel__nav');

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('aria-label', 'Vorheriges Zitat');
    prevBtn.classList.add('quote-carousel__btn', 'quote-carousel__btn--prev');
    prevBtn.textContent = '\u2190';
    prevBtn.addEventListener('click', () => this.go(-1));

    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('aria-label', 'Nächstes Zitat');
    nextBtn.classList.add('quote-carousel__btn', 'quote-carousel__btn--next');
    nextBtn.textContent = '\u2192';
    nextBtn.addEventListener('click', () => this.go(1));

    const dots = document.createElement('div');
    dots.classList.add('quote-carousel__dots');
    dots.setAttribute('role', 'tablist');
    this.items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('quote-carousel__dot');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Zitat ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => this.goTo(i));
      dots.appendChild(dot);
    });

    nav.appendChild(prevBtn);
    nav.appendChild(dots);
    nav.appendChild(nextBtn);
    this.appendChild(nav);

    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.dots = [...dots.children];
    this.updateControls();
  }

  observeScroll() {
    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.currentIndex = this.items.indexOf(entry.target);
            this.updateControls();
          }
        }
      },
      { root: this.track, threshold: 0.5 },
    );
    this.items.forEach((item) => this._observer.observe(item));
  }

  go(direction) {
    this.goTo(this.currentIndex + direction);
  }

  goTo(index) {
    const target = this.items[Math.max(0, Math.min(index, this.items.length - 1))];
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  updateControls() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.items.length - 1;
    this.dots.forEach((dot, i) => {
      dot.setAttribute('aria-selected', i === this.currentIndex ? 'true' : 'false');
    });
  }
}

customElements.define('check-to-toggle', CheckToToggle);
customElements.define('multi-toggler', MultiToggler);
customElements.define('sub-menu', Submenu);
customElements.define('menu-toggle', MenuToggle);
customElements.define('wall-of-consent', WallOfConsent);
// DEPRECATED: ClickableArea JavaScript is no longer needed (CSS-only solution in _clickable-area.scss)
// customElements.define('clickable-area', ClickableArea)
customElements.define('touch-detection', TouchDetection);
customElements.define('auto-submit-form', AutoSubmitForm);
customElements.define('audio-player', AudioPlayer);
customElements.define('quote-carousel', QuoteCarousel);
