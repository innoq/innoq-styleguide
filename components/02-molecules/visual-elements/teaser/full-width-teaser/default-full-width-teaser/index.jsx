import { createElement } from 'complate-stream'
import classNames from 'classnames'
import Button from '../../../../../01-atoms/input-elements/button/index.jsx'

export default function DefaultFullWidthTeaser ({ header, caption, href, linkText, simple, punchIn, withButton, additionalClasses, headerAdditionalClasses, align }, ...children) {
  const leftAligned = (align === 'left')
  const classname = classNames('default-full-width-teaser', { 'default-full-width-teaser--simple': simple, 'default-full-width-teaser--left-aligned': leftAligned }, additionalClasses)
  let headerClass
  if (punchIn) {
    headerClass = classNames('punch-in', headerAdditionalClasses)
  }

  return <div class={classname}>
    <div class='default-full-width-teaser__wrapper'>
      <div class='default-full-width-teaser__body'>
        <div>
          <div class='default-full-width-teaser__caption'>{caption}</div>
          <div>
            <div class='default-full-width-teaser__header'>
              <h1 class={headerClass}>{header}</h1>
            </div>
            <div class='default-full-width-teaser__text'>
              {children}
            </div>
            <div class='default-full-width-teaser__footer'>
              {withButton ? <Button href={href} size='small' cta>{linkText}</Button>
                : <a href={href} class='link-teaser'>{linkText}</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
