import { context } from '../../../env'

const urlBackground = context.uri('static/visual-header-koralle.jpg')

export const cssBackground = `background-image: url(${urlBackground});`
export const cssBackgroundSmall = `background-image: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)), url(${urlBackgroundSmall});`
