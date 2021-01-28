import { context } from '../../../../env'

const urlBackground = context.uri('assets/bg-images/edition-02/edition02-human-02.jpg')
const urlRight = context.uri('assets/example-content/heribert-rechts.png')
const urlLeft = context.uri('assets/example-content/heribert-links.png')

export const cssBackground = `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${urlBackground});`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
