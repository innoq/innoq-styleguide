import { createElement } from 'complate-stream'
import classnames from 'classnames'

export default function Button ({ variant, inverted }, ...children) {
  let buttonClass = classnames(`btn btn--${variant}`, { 'btn--inverted': inverted })
  let label
  if (variant === 'cta') {
    label = children.join('')
  }
  return <button class={buttonClass} data-label={label}>{children}</button>
}
