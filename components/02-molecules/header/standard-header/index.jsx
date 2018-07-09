import { createElement } from 'complate-stream'
import { cssBackground } from './config'

export default function StandardHeader ({ contentType, title, subtitle, date }, ...children) {
  return <header class='standard-header' style={cssBackground}>
    { contentType ? <h3 class='standard-header__type'>{contentType}</h3> : ''}
    <h1 class='standard-header__title'>{title}</h1>
    { subtitle ? <h2 class='standard-header__subtitle'>{subtitle}</h2> : ''}
    <div class='standard-header__intro'>
      { date ? <time class='standard-header__intro__date'>{date}</time> : ''}
      <div class='standard-header__intro__text'>
        {children}
      </div>
    </div>
  </header>
}
