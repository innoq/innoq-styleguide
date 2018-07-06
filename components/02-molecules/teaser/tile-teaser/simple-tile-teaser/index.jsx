import { createElement } from 'complate-stream'
import Button from '../../../../01-atoms/form/button/index.jsx'

export default function SimpleTileTeaser ({ title, subtitle, buttonText }) {
  return <div class='simple-teaser'>
    <div class='simple-teaser__body'>
      <a href='#' class='simple-teaser__link'>
        <h5>{title}</h5>
        <h6>{subtitle}</h6>
      </a>
    </div>
    <div class='simple-teaser__footer'>
      <Button size='small' cta>{buttonText}</Button>
    </div>
  </div>
}
