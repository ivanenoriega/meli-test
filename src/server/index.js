import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import App from '../shared/App';
import routes from '../shared/routes';
import apiRoutes from './api/routes';
import sourceMapSupport from 'source-map-support';
import template from './template/template';

if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use('/api', apiRoutes);

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.path, route));
  let param = '';
  switch (activeRoute.path) {
    case '/items':
      param = req.url.replace('/items?search=', '');
      break;
    case '/items/:id':
      param = req.url.replace('/items/', '');
  }
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const requestInitialData =
    activeRoute.component.requestInitialData && activeRoute.component.requestInitialData(param, baseUrl);

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const title = 'Mercado Libre Argentina';
      const context = { initialData };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(template({
        markup,
        initialData,
        title
      }));
    })
    .catch(next);
});

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
