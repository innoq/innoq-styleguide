import { createElement } from 'complate-stream'
import classNames from 'classnames'

export default function TrainingListTeaser ({ primary, secondary, title, subtitle, linkText, href }, ...children) {
  let teaserClass = classNames({ ' list-teaser-training primary': primary }, { 'list-teaser-training secondary': secondary })
  let linkTeaserClass = classNames('link-teaser', {
    'inverted-text-color': primary,
    'inverted-interaction-color': secondary
  })

  return <a href={href} class={teaserClass}>
    <div class='list-teaser__body'>
      <h2 class='list-teaser-training__headline'>{title}</h2>
      {subtitle ? <div class='list-teaser-training__caption'>{subtitle}</div> : ''}
      {children}
    </div>
    <div class='list-teaser__footer'>
      <span class={linkTeaserClass}>{linkText}</span>
    </div>
  </a>
}
