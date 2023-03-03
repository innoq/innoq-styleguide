class CheckToToggle extends HTMLElement {
  connectedCallback() {
    this.checkbox.onclick = this.toggle.bind(this);
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

    this.checkbox.addEventListener('change', this.onToggle.bind(this));
    this.toggleContent = this.toggleContent.bind(this);
    document.body.addEventListener(this.eventName, this.toggleContent);
  }

  disconnectedCallback() {
    document.body.removeEventListener(this.eventName, this.toggleContent);
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

class DropdownToggle {
  constructor(label, name) {
    this.label = label;
    this.name = name;
    this.checkbox = document.querySelector('#' + name);
    this.relatedLink = document.querySelector('a[data-for=' + name + ']');
  }

  toggle() {
    this.checkbox.checked = !this.checkbox.checked;
  }

  set checked(v) {
    this.checkbox.checked = Boolean(v);
  }

  get checked() {
    return this.checkbox.checked
  }
}

class Navbar extends HTMLElement {
  connectedCallback() {
    if (!this.isInitialized) {
      this.init();
    }
  }

  init() {
    this.primaryList = document.querySelector('.primary-nav__list');
    this.dropdownToggles = Array.from(document.querySelectorAll('.dropdown__toggle--navbar')).map(
      (el) => new DropdownToggle(el, el.getAttribute('for'))
    );
    this.dropdownPrimaryLinks = document.querySelectorAll('.dropdown .navbtn--primary');

    // add --enhanced modifier
    this.enhance([
      '.primary-nav',
      '.primary-nav__list',
      '.primary-nav__item',
      '.dropdown__list-wrapper',
      '.dropdown__toggle',
    ]);

    // enhance drill down ux
    // (copy dropdown heading link into dropdown list if not present)
    this.dropdownPrimaryLinks.forEach((link) => {
      const targetDropdownList = link.parentNode.querySelector('.dropdown__list');
      if (!targetDropdownList.querySelector('.dropdown__item--clone')) {
        const anchorClone = document.createElement('a');
        anchorClone.classList.add('dropdown__link', 'dropdown__link--navbar', 'navbtn');
        anchorClone.setAttribute('href', link.getAttribute('href'));
        anchorClone.textContent = link.textContent;

        const newListItem = document.createElement('li');
        newListItem.classList.add('dropdown__item', 'dropdown__item--navbar', 'dropdown__item--clone');
        newListItem.appendChild(anchorClone);

        targetDropdownList.insertBefore(newListItem, targetDropdownList.firstChild);
      }
    });

    // apply several event listeners
    this.dropdownToggles.forEach((ddt, i, all) => {
      ddt.label.addEventListener('click', () => {
        this.uncheckDropdownToggles(all, ddt);
        this.primaryList.classList.add('primary-nav__list--level2');
      });
      ddt.relatedLink.addEventListener('mouseenter', () => {
        this.uncheckDropdownToggles(all, ddt);
        this.primaryList.classList.remove('primary-nav__list--level2');
      });
      ddt.relatedLink.addEventListener('click', (e) => {
        if (this.isMobile) {
          e.preventDefault();
          ddt.checked = true;
          this.uncheckDropdownToggles(all, ddt);
          this.primaryList.classList.add('primary-nav__list--level2');
        }
      });
    });

    document.querySelector('.navbtn--drill-up').addEventListener('click', () => {
      this.uncheckDropdownToggles(this.dropdownToggles);
      this.primaryList.classList.remove('primary-nav__list--level2');
    });

    document.querySelector('body').addEventListener('click', (e) => {
      if (this.primaryList.contains(e.target)) return
      this.uncheckDropdownToggles(this.dropdownToggles);
      this.primaryList.classList.remove('primary-nav__list--level2');
    });

    this.isInitialized = true;
  }

  enhance(selectors) {
    selectors.forEach((s) => {
      s = s.startsWith('.') ? s.slice(1) : s;
      Array.from(document.querySelectorAll('.' + s)).forEach((e) => e.classList.add(s + '--enhanced'));
    });
  }

  uncheckDropdownToggles(toggles, except) {
    toggles.forEach((t) => {
      if (except !== t) {
        t.checked = false;
      }
    });
  }

  get isMobile() {
    if (this.primaryList.getBoundingClientRect().width > window.innerWidth) {
      return true
    } else {
      return false
    }
  }
}

class Submenu extends HTMLElement {
  connectedCallback() {
    let summary = this.querySelector('summary');
    let ul = this.querySelector('ul');
    if (!summary && !ul) {
      return
    }

    // With out method of animating the collapsing/expanding of the menu, it is
    // necessary to wrap the content of the menu in a `<div>`
    this.innerHTML = `<button type="button" aria-expanded="false">${summary.innerHTML}</button><div>${ul.outerHTML}</div>`;
    this.button.addEventListener('click', () => this.toggle());

    this.navigation.addEventListener('submenu-toggle', (ev) => {
      if (ev.detail && ev.detail.expanded && ev.target !== this.button) {
        if (this.button.getAttribute('aria-expanded') === 'true') {
          this.toggle(false);
        }
      }
    });
    this.toggle(false);
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
    this.button.addEventListener('click', () => this.toggle());
    this.toggle(false);
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

// following advice from https://inclusive-components.design/cards
class ClickableArea extends HTMLElement {
  connectedCallback() {
    if (this.link) {
      this.addEventListener('mousedown', this.handleMousedown.bind(this));
      this.addEventListener('mouseup', this.handleMouseup.bind(this));
      this.style.cursor = 'pointer';
    }
  }

  handleMousedown({ timeStamp }) {
    this.down = timeStamp;
  }

  handleMouseup({ timeStamp }) {
    if (timeStamp - this.down < 200) {
      this.link.click();
    }
  }

  get link() {
    return this.querySelector('a')
  }
}

class TouchDetection extends HTMLElement {
  connectedCallback() {
    window.addEventListener(
      'touchstart',
      function touched() {
        document.body.classList.add('instructions--touch-active');
        window.removeEventListener('touchstart', touched, false);
      },
      false
    );
  }
}

class AutoSubmitForm extends HTMLElement {
  connectedCallback() {
    let form = this.querySelector('form');
    form.addEventListener('change', form.submit);
    this.classList.add('enhanced');
  }
}

customElements.define('check-to-toggle', CheckToToggle);
customElements.define('multi-toggler', MultiToggler);
customElements.define('nav-bar', Navbar);
customElements.define('sub-menu', Submenu);
customElements.define('menu-toggle', MenuToggle);
customElements.define('wall-of-consent', WallOfConsent);
customElements.define('clickable-area', ClickableArea);
customElements.define('touch-detection', TouchDetection);
customElements.define('auto-submit-form', AutoSubmitForm);
