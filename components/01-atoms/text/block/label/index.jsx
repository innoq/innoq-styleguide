import { createElement } from 'complate-stream'
import classnames from 'classnames'

export default function CaseTileTeaser ({type, big, inverted}, ...children) {
  let classname = classnames(big ? 'label-big' : 'label', type, { 'badge--inverted': inverted })

  return <div class={classname}>{children}</div>
}
