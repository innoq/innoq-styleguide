import { createElement } from 'complate-stream'
import classnames from 'classnames'

export default function CaseTileTeaser ({ size, additionalClassnames, href, caption, headline, linkTeaser }, ...children) {
  let classname = classnames('case-tile-teaser', additionalClassnames)
  let contentClass = 'case-tile-teaser__content'
  let headlineClass = 'case-tile-teaser__headline'
  let textClass = 'case-tile-teaser__text'

  if (size === 'sm') {
    classname = classnames(classname, 'case-tile-teaser--sm')
    contentClass = classnames(contentClass, 'case-tile-teaser__content--sm')
    headlineClass = classnames(headlineClass, 'case-tile-teaser__headline--sm')
    textClass = classnames(textClass, 'case-tile-teaser__text--sm')
  }

  return <a href={href} class={classname}>
    <div class={contentClass}>
      <div class='case-tile-teaser__body'>
        <h2 class='case-tile-teaser__caption'>{caption}</h2>
        <h2 class={headlineClass}>{headline}</h2>
        <p class={textClass}>{children}</p>
      </div>
      <div class='case-tile-teaser__goto'>
        <span class='link-teaser'>{linkTeaser}</span>
      </div>
    </div>
  </a>
}
