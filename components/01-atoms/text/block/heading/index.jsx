import { createElement } from 'complate-stream'

export function SectionHeading ({ primary, secondary, tertiary }, ...children) {
  if (primary) {
    return <h3 class='section-heading--primary'>{children}</h3>
  } else if (secondary) {
    return <h4 class='section-heading--secondary'>{children}</h4>
  } else if (tertiary) {
    return <h5 class='section-heading--tertiary'>{children}</h5>
  }
}
