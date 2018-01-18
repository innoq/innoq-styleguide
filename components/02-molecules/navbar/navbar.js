class DropdownToggle {
  constructor (label, name) {
    this.label = label
    this.name = name
    this.checkbox = document.querySelector('#' + name)
    this.relatedLink = document.querySelector('a[data-for=' + name + ']')
  }

  toggle () {
    this.checkbox.checked = !this.checkbox.checked
  }

  set checked (v) {
    this.checkbox.checked = Boolean(v)
  }

  get checked () {
    return this.checkbox.checked
  }
}

export default class Navbar {
  init () {
    let navbar = this
    navbar.primaryList = document.querySelector('.primary-nav__list')
    navbar.dropdownToggles = navbar.compileDropdownToggles('.dropdown__toggle--navbar')

    navbar.enhance([
      '.primary-nav',
      '.primary-nav__list',
      '.primary-nav__item',
      '.dropdown__list-wrapper',
      '.dropdown__icon',
      '.dropdown__toggle'
    ])

    navbar.dropdownToggles.forEach((ddt, i, all) => {
      ddt.label.addEventListener('click', e => {
        navbar.uncheckDropdownToggles(all, ddt)
        navbar.primaryList.classList.add('primary-nav__list--level2')
      })
      ddt.relatedLink.addEventListener('mouseenter', e => {
        navbar.uncheckDropdownToggles(all, ddt)
        navbar.primaryList.classList.remove('primary-nav__list--level2')
      })
    })

    document.querySelector('.navbtn--drill-up')
      .addEventListener('click', e => {
        navbar.uncheckDropdownToggles(navbar.dropdownToggles)
        navbar.primaryList.classList.remove('primary-nav__list--level2')
      })
  }

  compileDropdownToggles (selector) {
    return Array.from(document.querySelectorAll(selector))
      .map(el => new DropdownToggle(el, el.getAttribute('for')))
  }

  enhance (selectors) {
    selectors.forEach(s => {
      s = s.startsWith('.') ? s.slice(1) : s
      Array
        .from(document.querySelectorAll('.' + s))
        .forEach(e => e.classList.add(s + '--enhanced'))
    })
  }

  uncheckDropdownToggles (toggles, except) {
    toggles.forEach(t => {
      if (except !== t) {
        t.checked = false
      }
    })
  }

  // toggleBEM (elem, base, modifier) {
  //   if (typeof elem === 'string') {
  //     elem = document.querySelector(elem)
  //   } elseif (elem instanceof HTMLElement === false) {
  //     return
  //   }
  //   elem.classList.toggle(base + '--' + modifier)
  // }
}
