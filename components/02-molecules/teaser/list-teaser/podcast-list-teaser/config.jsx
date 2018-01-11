import { context } from '../../../../env'

const urlRight = context.uri('static/heribert-rechts.png')
const urlLeft = context.uri('static/heribert-links.png')

export const cssRight = `background-image: url(${urlRight});`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
