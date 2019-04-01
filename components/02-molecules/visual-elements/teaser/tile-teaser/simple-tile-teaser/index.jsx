import { createElement } from 'complate-stream'
import Button from '../../../../../01-atoms/input-elements/button/index.jsx'

export default function SimpleTileTeaser ({ title, subtitle, buttonText, href, buttonHref }) {
  return <div class='simple-teaser'>
    <div class='simple-teaser__body'>
      <a href={href} class='simple-teaser__link'>
        <h5>{title}</h5>
        { subtitle ? <h6>{subtitle}</h6> : ''}
      </a>
    </div>
    <div class='simple-teaser__footer'>
      <Button href={buttonHref} size='small' cta>{buttonText}</Button>
    </div>
  </div>
}
