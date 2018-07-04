import { createElement } from 'complate-stream'

export default function Button ({ variant, inverted }, ...children) {
  let buttonClass = `btn btn--${variant}`
  if (inverted) {
    buttonClass += ' btn--inverted'
  }
  let label
  if (variant === 'cta') {
    label = children.join('')
  }
  return <button class={buttonClass} data-label={label}>{children}</button>
}
