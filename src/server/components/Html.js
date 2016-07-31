import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';

// jscs:disable
const Html = ({ assets, children, initialState }) => (
  <html lang="utf-8">
    <head>
      <meta charSet="utf-8"/>
      <title>Express-React-HMR-Boilerplate</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      />
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"
      />
      {Object.keys(assets.styles).map((style, i) =>
        <link
          key={i}
          href={assets.styles[style]}
          media="screen, projection"
          rel="stylesheet"
          type="text/css"
        />)}
    </head>

    <body>
      <div id="root"
        dangerouslySetInnerHTML={{
          __html: renderToString(children),
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};`,
        }}
      />
      <script src="https://code.jquery.com/jquery-2.2.3.min.js" />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en" />
      {Object.keys(assets.javascript).map((script, i) =>
        <script key={i} src={assets.javascript[script]} />
      )}
    </body>
  </html>
);
// jscs:enable

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.object,
  initialState: PropTypes.object,
};

export default Html;
