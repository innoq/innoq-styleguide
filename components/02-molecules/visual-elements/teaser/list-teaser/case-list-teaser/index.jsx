import { createElement } from 'complate-stream'
import classNames from 'classnames'
import Button from '../../../../../01-atoms/input-elements/button/index.jsx'

export default function CaseListTeaser ({ header, caption, href, linkText, simple, punchIn, withButton, additionalClasses, headerAdditionalClasses, align }, ...children) {
  const leftAligned = (align === 'left')
  const classname = classNames('case-teaser', { 'case-teaser--simple': simple, 'case-teaser--left-aligned': leftAligned }, additionalClasses)
  let headerClass
  if (punchIn) {
    headerClass = classNames('punch-in', headerAdditionalClasses)
  }

  return <div class={classname}>
    <div class='case-teaser__wrapper'>
      <div class='case-teaser__body'>
        <div>
          <div class='case-teaser__caption'>{caption}</div>
          <div>
            <div class='case-teaser__header'>
              <h2 class={headerClass}>{header}</h2>
            </div>
            <div class='case-teaser__text'>
              {children}
            </div>
            <div class='case-teaser__footer'>
              {withButton ? <Button href={href} size='small' cta>{linkText}</Button>
                : <a href={href} class='link-teaser'>{linkText}</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
