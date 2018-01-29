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

export default class Navbar extends HTMLElement {
  connectedCallback () {
    let navbar = this
    navbar.primaryList = document.querySelector('.primary-nav__list')
    navbar.dropdownToggles = navbar.compileDropdownToggles('.dropdown__toggle--navbar')
    navbar.dropdownPrimaryLinks = document.querySelectorAll('.dropdown .navbtn--primary')

    // add --enhanced modifier
    navbar.enhance([
      '.primary-nav',
      '.primary-nav__list',
      '.primary-nav__item',
      '.dropdown__list-wrapper',
      '.dropdown__icon',
      '.dropdown__toggle'
    ])

    // enhance drill down ux
    // (copy dropdown heading link into dropdown list)
    navbar.dropdownPrimaryLinks.forEach((link) => {
      let targetDropdownList = link.parentNode.querySelector('.dropdown__list')

      let anchorClone = document.createElement('a')
      anchorClone.classList.add('dropdown__link', 'dropdown__link--navbar', 'navbtn')
      anchorClone.setAttribute('href', anchorClone.getAttribute('href'))
      anchorClone.textContent = link.textContent

      let newListItem = document.createElement('li')
      newListItem.classList.add('dropdown__item', 'dropdown__item--navbar', 'dropdown__item--clone')
      newListItem.appendChild(anchorClone)

      targetDropdownList.insertBefore(newListItem, targetDropdownList.firstChild)
    })

    // apply several event listeners
    navbar.dropdownToggles.forEach((ddt, i, all) => {
      ddt.label.addEventListener('click', e => {
        navbar.uncheckDropdownToggles(all, ddt)
        navbar.primaryList.classList.add('primary-nav__list--level2')
      })
      ddt.relatedLink.addEventListener('mouseenter', e => {
        navbar.uncheckDropdownToggles(all, ddt)
        navbar.primaryList.classList.remove('primary-nav__list--level2')
      })
      ddt.relatedLink.addEventListener('click', e => {
        if (navbar.isMobile) {
          e.preventDefault()
          ddt.checked = true
          navbar.uncheckDropdownToggles(all, ddt)
          navbar.primaryList.classList.add('primary-nav__list--level2')
        }
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
      Array.from(document.querySelectorAll('.' + s))
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

  get isMobile () {
    if (this.primaryList.getBoundingClientRect().width > window.innerWidth) {
      return true
    } else {
      return false
    }
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
