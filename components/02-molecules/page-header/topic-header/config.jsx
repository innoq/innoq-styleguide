import { context } from '../../../env'

const urlBackground = context.uri('static/visual-header-igel.jpg')
const urlBackgroundSmall = context.uri('static/visual-header-igel-1440.jpg')

export const cssBackground = `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlBackground});`
export const cssBackgroundSmall = `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlBackgroundSmall});`
