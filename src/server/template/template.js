import serialize from 'serialize-javascript';

export default ({ markup, initialData, title }) => {
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8"/>
          <meta name="description" content="La comunidad de compra y venta online más grande de América Latina.">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
          <link rel="stylesheet" href="/css/main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
        </head>

        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
  `;
};