import { createElement } from "complate-stream";

export default function PreviewLayout(params, ...children) {
    const stylesheetPath = params.context.app.uri("css/bundle.css");

    return <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet"
            type="text/css"
            href="https://d1feosfg1qz8rt.cloudfront.net/assets/webfonts-9fafb7a845e0cef89527ed771552ec4708731a37c466c9ca82afa1ec57e21e00.css" />
          <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
          <link media="all" rel="stylesheet" href={stylesheetPath} />
          <title>Preview Layout</title>
        </head>
        <body class="application">
          {children}
        </body>
    </html>;
}
