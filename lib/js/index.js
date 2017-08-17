import { registerMacro, createElement } from 'complate-stream'

registerMacro('button-group', ({ title }, ...children) => {
  return <div class="button-group">
    <strong>{title}</strong>
    {children}
  </div>
})

registerMacro('preview-layout', ({ stylesheetPath }, ...children) => {
  return <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="https://innoq.com/fonts/webfonts.css" />
      <link media="all" rel="stylesheet" href={stylesheetPath} />
      <title>Preview Layout</title>
    </head>
    <body>
      {children}
    </body>
  </html>
})

export default createElement
