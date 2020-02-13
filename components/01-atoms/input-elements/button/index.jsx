import { createElement } from 'complate-stream'
import classNames from 'classnames'

export default function Button ({ size, inverted, cta, light, href }, ...children) {
  const buttonClass = classNames('btn', size && `btn--${size}`, { 'btn--light': light }, { 'btn--inverted': inverted }, { 'btn--cta': cta })
  let label
  if (cta) {
    label = children.join('')
  }
  return href ? <a href={href} class={buttonClass} data-label={label}>{children}</a>
    : <button class={buttonClass} data-label={label}>{children}</button>
}
