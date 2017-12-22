import { context } from '../../../../env'

const urlRight = context.uri('static/robert_podcast.png')
const urlLeft = context.uri('static/robert_podcast_left.png')

export const cssRight = `background-image: url(${urlRight});`
export const cssBoth = `background-image: url(${urlRight}), url(${urlLeft});`
