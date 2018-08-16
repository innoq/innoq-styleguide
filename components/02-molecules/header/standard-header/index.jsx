import { createElement } from 'complate-stream'
import classNames from 'classnames'

export default function StandardHeader ({ contentType, title, subtitle, introTitle, date, additionalClassnames, titleSeparated, headerStyle }, ...children) {
  let headerClass = classNames('standard-header', additionalClassnames)
  let titleClass = classNames('standard-header__title', { 'standard-header__title--separated': titleSeparated })

  return <header class={headerClass} style={headerStyle}>
    { contentType ? <h3 class='standard-header__type'>{contentType}</h3> : ''}
    <h1 class={titleClass}>{title}</h1>
    { subtitle ? <h2 class='standard-header__subtitle'>{subtitle}</h2> : ''}
    <div class='standard-header__intro'>
      { introTitle ? <h2>{introTitle}</h2> : '' }
      { date ? <time class='standard-header__intro__date'>{date}</time> : ''}
      <div class='standard-header__intro__text'>
        {children}
      </div>
    </div>
  </header>
}
