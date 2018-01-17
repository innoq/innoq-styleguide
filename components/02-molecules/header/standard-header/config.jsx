import { context } from '../../../env'

const urlBackground = context.uri('static/visual-header-medusa.jpg')

export const cssBackground= `background-image: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)), url(${urlBackground});`
