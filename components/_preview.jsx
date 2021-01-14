import { createElement } from 'complate-stream'

export default function PreviewLayout ({ context }, ...children) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' type='text/css' href={context.app.uri('assets/normalize.css')} />
        <link media='all' rel='stylesheet' href={context.app.uri('assets/bundle.css')} />
        <link rel='preload' href='https://hello.myfonts.net/count/350ed6' as='style' />
        <style>{'\
        body {\
          padding: 1rem;\
        }\
      '}</style>
        <title>Preview Layout</title>
      </head>
      <body class='application'>
        {children}
      </body>
      <script src={context.app.uri('assets/document-register-element.js')} />
      <script src={context.app.uri('assets/bundle.js')} />
    </html>
  )
}
