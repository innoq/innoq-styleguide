import { createElement } from 'complate-stream'
import classnames from 'classnames'

export default function CaseListTeaser ({ header, caption, href, linkText, simple, punchIn, withButton, additionalClasses, headerAdditionalClasses, align }, ...children) {
  let leftAligned
  if (align === 'left') {
    leftAligned = true
  }
  let classname = classnames('case-teaser', { 'case-teaser--simple': simple, 'case-teaser--left-aligned': leftAligned }, additionalClasses)
  let headerClass
  if (punchIn) {
    headerClass = classnames('punch-in', headerAdditionalClasses)
  }
  let linkClass = 'link-teaser'
  if (withButton) {
    linkClass = 'btn btn--small btn--cta'
  }

  return <div class={classname}>
    <div class='case-teaser__wrapper'>
      <div class='case-teaser__body'>
        <div>
          <div class='case-teaser__caption'>{caption}</div>
          <div>
            <div class='case-teaser__header'>
              <h1 class={headerClass}>{header}</h1>
            </div>
            <div class='case-teaser__text'>
              {children}
            </div>
            <div class='case-teaser__footer'>
              <a href={href} class={linkClass}>{linkText}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
