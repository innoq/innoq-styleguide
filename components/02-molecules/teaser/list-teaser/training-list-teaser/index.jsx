import { createElement } from 'complate-stream'
import classnames from 'classnames'

export default function TrainingListTeaser ({ primary, secondary, title, subtitle, label, linkText }) {
  let teaserClass = classnames({ ' list-teaser-training primary': primary }, { 'list-teaser-training secondary': secondary })
  let linkTeaserClass = classnames('link-teaser', {
    'inverted-text-color': primary,
    'inverted-interaction-color': secondary
  })
  let labelClass = classnames('label-big', {
    'badge--inverted': primary,
    'badge': secondary
  })

  return <a href='#' class={teaserClass}>
    <div class='list-teaser__body'>
      <h2 class='list-teaser-training__headline'>{title}</h2>
      { subtitle ? <div class='list-teaser-training__caption'>{subtitle}</div> : ''}
      { label ? <div class={labelClass}>{label} </div> : ''}
    </div>
    <div class='list-teaser__footer'>
      <span class={linkTeaserClass}>{linkText}</span>
    </div>
  </a>
}
