import { context } from '../../../../env'

const urlRight = context.uri('assets/heribert-rechts.png')
const urlLeft = context.uri('assets/heribert-links.png')

export const cssRight = `background-image: url(${urlRight});`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
