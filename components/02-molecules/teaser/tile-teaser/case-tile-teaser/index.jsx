import { createElement } from 'complate-stream'
import classNames from 'classnames'

export default function CaseTileTeaser ({ size, additionalClassnames, href, caption, headline, linkTeaser }, ...children) {
  let classname = classNames('case-tile-teaser', additionalClassnames)
  let contentClass = 'case-tile-teaser__content'
  let headlineClass = 'case-tile-teaser__headline'
  let textClass = 'case-tile-teaser__text'

  if (size === 'sm') {
    classname = classNames(classname, 'case-tile-teaser--sm')
    contentClass = classNames(contentClass, 'case-tile-teaser__content--sm')
    headlineClass = classNames(headlineClass, 'case-tile-teaser__headline--sm')
    textClass = classNames(textClass, 'case-tile-teaser__text--sm')
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
