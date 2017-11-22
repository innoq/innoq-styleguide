import { createElement } from 'complate-stream'

export default function PreviewLayout ({ context }, ...children) {
  return <html>
    <head>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='stylesheet' type='text/css' href={context.app.uri('css/normalize.css')} />
      <link media='all' rel='stylesheet' href={context.app.uri('css/bundle.css')} />
      <title>Preview Layout</title>
    </head>
    <body class='application'>
      {children}
    </body>
    <script src={context.app.uri('js/document-register-element.js')} />
    <script src={context.app.uri('js/bundle.js')} />
  </html>
}
