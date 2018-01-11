import { context } from '../../../env'

const url = context.uri('static/heribert.jpg')

export const css = `background-image: url(${url});`
