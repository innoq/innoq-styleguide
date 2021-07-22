import { context } from '../../../env'

const urlBackground = context.uri('assets/bg-images/general/visual-trainings-01.jpg')
const urlRight = context.uri('assets/example-content/heribert-rechts.png')
const urlLeft = context.uri('assets/example-content/heribert-links.png')

export const cssBackground = `background-image: url(${urlBackground}); background-color: var(--overlay-standard-color);`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
