import { context } from '../../../../../env'

const urlRight = context.uri('assets/example-content/heribert-rechts.png')
const urlLeft = context.uri('assets/example-content/heribert-links.png')

export const cssRight = `background-image: url(${urlRight});`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
