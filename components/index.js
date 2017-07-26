import { registerMacro, createElement } from 'complate-stream'

registerMacro('my-button', (params, ...children) => {
  return <button>{children}</button>
})

registerMacro('my-content', (params, ...children) => {
  return <div>
    <strong>{children}</strong>
  </div>
})

registerMacro('preview-layout', (params, ...children) => {
  return <html>
    <head>
      <meta charset="utf-8" />
      <title>Preview Layout</title>
    </head>
    <body>
      {children}
    </body>
  </html>
})

export default createElement
