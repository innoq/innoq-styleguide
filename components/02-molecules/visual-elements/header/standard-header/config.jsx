import { context } from '../../../../env'

const urlBackground = context.uri('assets/visual-header-medusa.jpg')
const urlRight = context.uri('assets/heribert-rechts.png')
const urlLeft = context.uri('assets/heribert-links.png')

export const cssBackground = `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${urlBackground});`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
