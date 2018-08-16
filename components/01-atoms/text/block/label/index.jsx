import { createElement } from 'complate-stream'
import classNames from 'classnames'

export default function CaseTileTeaser ({ type, big, inverted }, ...children) {
  let classname = classNames(big ? 'label-big' : 'label', type, { 'badge--inverted': inverted })

  return <div class={classname}>{children}</div>
}
