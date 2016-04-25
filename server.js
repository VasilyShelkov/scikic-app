const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();
const port = process.env.PORT || 8080;
const compiler = webpack(config);

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/public', express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/bootstrap', express.static(
	path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
	)
);
app.use('/typist', express.static(
	path.join(__dirname, 'node_modules', 'react-typist', 'dist')
	)
);

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server running at http://localhost:${port}`);
});
