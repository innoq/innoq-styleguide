import { context } from '../../../env'

const urlBackground = context.uri('static/visual-header-koralle.jpg')
const urlBackgroundSmall = context.uri('static/visual-header-koralle.jpg')

export const cssBackground = `background-image: url(${urlBackground});`
export const cssBackgroundSmall = `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlBackgroundSmall});`
