import { registerMacro, createElement } from 'complate-stream'

registerMacro('button-group', ({ title }, ...children) => {
  return <div class="button-group">
    <strong>{title}</strong>
    {children}
  </div>
})

registerMacro('preview-layout', (params, ...children) => {
  return <html>
    <head>
      <meta charset="utf-8" />
      <link media="all" rel="stylesheet" href="/css/bundle.css" />
      <title>Preview Layout</title>
    </head>
    <body>
      {children}
    </body>
  </html>
})

export default createElement
