import { createElement } from 'complate-stream'
import classnames from 'classnames'

export default function Button ({ size, inverted, cta, light }, ...children) {
  let buttonClass = classnames(`btn btn--${size}`, { 'btn--light': light }, { 'btn--inverted': inverted }, { 'btn--cta': cta })
  let label
  if (cta) {
    label = children.join('')
  }
  return <button class={buttonClass} data-label={label}>{children}</button>
}
